import { render, screen } from '@testing-library/react'
import ue from '@testing-library/user-event'
import { Item } from 'src/components/Item'

// Настраиваем userEvent с опцией advanceTimers, которая позволяет Jest управлять таймерами в тестах
const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
})

// Описываем набор тестов для компонента Item
describe('Элемент списка задач', () => {
  // Создаем мок-функции для onDelete и onToggle, чтобы проверить их вызовы
  const onDelete = jest.fn()
  const onToggle = jest.fn()
  // Определяем тестовую задачу
  const task = { id: '1', header: 'Купить хлеб', done: false }

  // Тест на проверку длины названия задачи
  it('название не должно быть больше 32 символов', () => {
    // Рендерим компонент Item с тестовой задачей
    render(<Item {...task} onDelete={onDelete} onToggle={onToggle} />)
    // Проверяем, что текст задачи соответствует регулярному выражению (не более 32 символов)
    expect(screen.getByText(task.header)).toHaveTextContent(/^.{0,32}$/)
  })

  // Тест на проверку, что название задачи не пустое
  it('название не должно быть пустым', () => {
    // Рендерим компонент Item с тестовой задачей
    render(<Item {...task} onDelete={onDelete} onToggle={onToggle} />)
    // Проверяем, что элемент с текстом задачи не является пустым
    expect(screen.getByText(task.header)).not.toBeEmptyDOMElement()
  })

  // Тест на проверку, что нельзя удалять невыполненные задачи
  it('нельзя удалять невыполненные задачи', () => {
    // Рендерим компонент Item с тестовой задачей
    render(<Item {...task} onDelete={onDelete} onToggle={onToggle} />)
    // Получаем кнопку удаления и проверяем, что она отключена
    const deleteButton = screen.getByRole('button')
    expect(deleteButton).toBeDisabled()
  })

  // Тест на проверку переключения статуса задачи
  it('задача должна переключаться между выполненной и невыполненной', async () => {
    // Рендерим компонент Item с тестовой задачей
    render(<Item {...task} onDelete={onDelete} onToggle={onToggle} />)
    // Получаем чекбокс и имитируем клик пользователя
    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)
    // Проверяем, что функция onToggle была вызвана с правильным ID задачи
    expect(onToggle).toHaveBeenCalledWith(task.id)
  })

  // Тест на проверку вызова функции onDelete после удаления задачи
  it('после удаления задачи функция onDelete вызывается с правильным ID', async () => {
    // Меняем статус задачи на выполненный, чтобы кнопка удаления была активной
    const taskDone = { ...task, done: true }
    // Рендерим компонент Item с выполненной задачей
    render(<Item {...taskDone} onDelete={onDelete} onToggle={onToggle} />)
    // Получаем кнопку удаления и имитируем клик пользователя
    const deleteButton = screen.getByRole('button')
    await userEvent.click(deleteButton)
    // Проверяем, что функция onDelete была вызвана с правильным ID задачи
    expect(onDelete).toHaveBeenCalledWith(task.id)
  })
})

// npm test -- Item.spec.tsx --watch
