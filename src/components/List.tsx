import { useState, useMemo } from 'react'
import { Item } from './Item'

type Props = {
  items: Task[]
  onDelete: (id: Task['id']) => void
  onToggle: (id: Task['id']) => void
}

export const List = ({ items, onDelete, onToggle }: Props) => {
  const [filter, setFilter] = useState<boolean>(false)

  const filteredItems = useMemo(() => {
    return filter ? items.filter((item) => !item.done) : items
  }, [filter, items])

  const toggleFilter = () => setFilter((prevFilter) => !prevFilter)

  const buttonText = filter ? 'Все задачи' : 'Незавершенные задачи'

  const buttonClass = filter ? 'button-all' : 'button-active'

  return (
    <>
      <button onClick={toggleFilter} className={buttonClass}>
        {buttonText}
      </button>
      <ul className="task-list tasks">
        {filteredItems.map((item) => (
          <Item
            {...item}
            key={item.id}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </>
  )
}
