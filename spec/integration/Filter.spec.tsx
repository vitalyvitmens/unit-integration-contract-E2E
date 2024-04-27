import { render, screen } from '@testing-library/react'
import uE from '@testing-library/user-event'
import { List } from 'src/components/List'

// Настраиваем userEvent с опцией advanceTimers, которая позволяет Jest управлять таймерами в тестах
const userEvent = uE.setup({
  advanceTimers: jest.advanceTimersByTime,
})

describe('Список задач', () => {
  // не содержит выполненные задачи, после нажатия на кнопку фильтрации
  // Описываем тест для случая, когда фильтр включен, тест асинхронный, так как мы ожидаем завершения пользовательских событий
  it('с включенным фильтром', async () => {
    // Создаем мок-функции для onDelete и onToggle, чтобы проверить, вызываются ли они
    const onDelete = jest.fn()
    const onToggle = jest.fn()

    // Определяем начальный набор задач для тестирования
    const items: Task[] = [
      { id: '2', header: 'купить молоко', done: false },
      { id: '3', header: 'выгулять Ричи', done: false },
    ]

    // Рендерим компонент List с начальным состоянием фильтра (все задачи)
    const { rerender, asFragment } = render(
      <List items={items} onDelete={onDelete} onToggle={onToggle} />
    )
    // Сохраняем снимок DOM для последующего сравнения
    const firstRender = asFragment()

    // Симулируем клик по кнопке для активации фильтра, чтобы показать только незавершенные задачи
    await userEvent.click(screen.getByText(/Незавершенные задачи/i))

    // Проверяем, что завершенные задачи не отображаются
    expect(screen.queryByText('купить хлеб')).toBeNull()

    // Ререндерим компонент с теми же пропсами
    rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />)
    // Сохраняем новый снимок DOM после ререндера
    const secondRender = asFragment()

    // Проверяем, что состояние фильтра сохранено и завершенные задачи по-прежнему не отображаются
    expect(screen.queryByText('купить хлеб')).toBeNull()
    expect(screen.getByText('купить молоко')).toBeInTheDocument()
    expect(screen.getByText('выгулять Ричи')).toBeInTheDocument()
    // Сравниваем два снимка DOM, чтобы убедиться, что они не отличаются
    expect(firstRender).toMatchDiffSnapshot(secondRender)
  })

  // показывает как выполненные, так и не выполненные задачи
  // после повторного нажатия на кнопку фильтрации
  it('с выключенным фильтром', async () => {
    const onDelete = jest.fn()
    const onToggle = jest.fn()

    // Определяем набор задач, включая выполненные и незавершенные
    const items: Task[] = [
      { id: '1', header: 'купить хлеб', done: true },
      { id: '2', header: 'купить молоко', done: false },
      { id: '3', header: 'выгулять Ричи', done: false },
    ]

    // Рендерим компонент List с начальным состоянием фильтра (все задачи)
    render(<List items={items} onDelete={onDelete} onToggle={onToggle} />)

    // Симулируем клик по кнопке для активации фильтра, чтобы показать только незавершенные задачи
    await userEvent.click(screen.getByText(/Незавершенные задачи/i))

    // Проверяем, что после активации фильтра выполненные задачи не отображаются
    expect(screen.queryByText('купить хлеб')).toBeNull()

    // Симулируем клик по кнопке еще раз, чтобы деактивировать фильтр и показать все задачи
    await userEvent.click(screen.getByText(/Все задачи/i))

    // Проверяем, что теперь отображаются все задачи
    expect(screen.getByText('купить хлеб')).toBeInTheDocument()
    expect(screen.getByText('купить молоко')).toBeInTheDocument()
    expect(screen.getByText('выгулять Ричи')).toBeInTheDocument()
  })

  it('переключает отображение задач с незавершенных на все', async () => {
    const onDelete = jest.fn()
    const onToggle = jest.fn()

    const items: Task[] = [
      { id: '1', header: 'купить хлеб', done: true },
      { id: '2', header: 'купить молоко', done: false },
      { id: '3', header: 'выгулять Ричи', done: false },
    ]

    // Рендер компонента со списком задач
    render(<List items={items} onDelete={onDelete} onToggle={onToggle} />)

    // Поиск кнопки фильтрации и проверка её начального текста
    const filterButtonEl = screen.getByRole('button', {
      name: /Незавершенные задачи/i,
    })
    expect(filterButtonEl).toHaveTextContent('Незавершенные задачи')

    // Клик по кнопке фильтрации
    await userEvent.click(filterButtonEl)

    // Проверка изменения текста кнопки после клика
    expect(filterButtonEl).toHaveTextContent('Все задачи')

    // Повторный клик по кнопке фильтрации, для выключения фильтрации
    await userEvent.click(filterButtonEl)

    // Проверка изменения текста кнопки после повторного клика по кнопке фильтрации, для выключения фильтрации
    expect(filterButtonEl).toHaveTextContent('Незавершенные задачи')
  })
})

// npm test -- Filter.spec.tsx --watch
// npm test -- Filter.spec.tsx --u // где --u это автообновление snapshot
