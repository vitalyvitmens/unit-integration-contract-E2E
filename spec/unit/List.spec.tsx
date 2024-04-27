import { render, screen } from '@testing-library/react'
import { List } from 'src/components/List'

it('отображение списка задач', () => {
  const onDelete = jest.fn()
  const onToggle = jest.fn()

  const items: Task[] = [
    {
      id: '1',
      header: 'купить хлеб',
      done: false,
    },
    {
      id: '2',
      header: 'купить молоко',
      done: false,
    },
    {
      id: '3',
      header: 'выгулять Ричи',
      done: true,
    },
  ]

  const { rerender, asFragment } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />
  )
  const firstRender = asFragment()

  items.pop()

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />)
  const secondRender = asFragment()

  expect(firstRender).toMatchDiffSnapshot(secondRender)
})

// Тест для проверки количества невыполненных задач
it('Список содержит не больше 10 невыполненных задач', () => {
  const onDelete = jest.fn()
  const onToggle = jest.fn()

  // Предположим, что у нас есть список из 12 задач, из которых 2 выполнены и 10 не выполнены
  const items: Task[] = [
    { id: '1', header: 'задача 1', done: false },
    { id: '2', header: 'задача 2', done: false },
    { id: '3', header: 'задача 3', done: false },
    { id: '4', header: 'задача 4', done: false },
    { id: '5', header: 'задача 5', done: false },
    { id: '6', header: 'задача 6', done: false },
    { id: '7', header: 'задача 7', done: false },
    { id: '8', header: 'задача 8', done: false },
    { id: '9', header: 'задача 9', done: false },
    { id: '10', header: 'задача 10', done: false },
    { id: '11', header: 'задача 11', done: true },
    { id: '12', header: 'задача 12', done: true },
  ]

  // Рендер компонента List с задачами
  render(<List items={items} onDelete={onDelete} onToggle={onToggle} />)

  // Фильтруем невыполненные задачи
  const uncompletedTasks = items.filter((task) => !task.done)

  // Проверяем, что невыполненных задач не больше 10
  expect(uncompletedTasks.length).toBeLessThanOrEqual(10)
})

it('Список содержит не больше 10 невыполненных задач', async () => {
  const onDelete = jest.fn()
  const onToggle = jest.fn()

  // Создаем массив из 12 задач, из которых 2 выполнены и 10 не выполнены
  const items: Task[] = [
    { id: '1', header: 'задача 1', done: false },
    { id: '2', header: 'задача 2', done: false },
    { id: '3', header: 'задача 3', done: false },
    { id: '4', header: 'задача 4', done: false },
    { id: '5', header: 'задача 5', done: false },
    { id: '6', header: 'задача 6', done: false },
    { id: '7', header: 'задача 7', done: false },
    { id: '8', header: 'задача 8', done: false },
    { id: '9', header: 'задача 9', done: false },
    { id: '10', header: 'задача 10', done: false },
    { id: '11', header: 'задача 11', done: true },
    { id: '12', header: 'задача 12', done: true },
  ]

  // Рендерим компонент List с задачами
  render(<List items={items} onDelete={onDelete} onToggle={onToggle} />)

  // Получаем все элементы списка
  const listItems = screen.getAllByRole('listitem')

  // Фильтруем невыполненные задачи
  const uncompletedTasks = listItems.filter(
    (item) =>
      !(item.querySelector('input[type="checkbox"]') as HTMLInputElement)
        .checked
  )

  // Проверяем, что невыполненных задач не больше 10
  expect(uncompletedTasks.length).toBeLessThanOrEqual(10)
})

// npm test -- List.spec.tsx --u // где --u это автообновление snapshot
