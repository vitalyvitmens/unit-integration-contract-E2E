import { render, screen } from '@testing-library/react'
import { Notifier } from 'src/components/Notifier'

describe('Оповещение при выполнении задачи', () => {
  // Тест на проверку отображения оповещения с заголовком задачи
  it('появляется и содержит заголовок задачи', () => {
    const handleClose = jest.fn()
    render(<Notifier task="Купить хлеб" open={true} onClose={handleClose} />)
    // Проверяем, что оповещение отображается
    expect(screen.getByText('Купить хлеб')).toBeInTheDocument()
    // Проверяем, что оповещение содержит правильный текст
    expect(screen.getByText('Купить хлеб')).toHaveTextContent('Купить хлеб')
  })

  // Тест на проверку, что одновременно отображается только одно оповещение
  it('одновременно может отображаться только одно', () => {
    const handleClose = jest.fn()
    // Рендерим первое оповещение
    const { rerender } = render(
      <Notifier task="Купить хлеб" open={true} onClose={handleClose} />
    )
    // Рендерим второе оповещение, которое должно заменить первое
    rerender(
      <Notifier task="Купить молоко" open={true} onClose={handleClose} />
    )
    // Проверяем, что второе оповещение отображается
    expect(screen.getByText('Купить молоко')).toBeInTheDocument()
    // Проверяем, что первое оповещение больше не отображается
    expect(screen.queryByText('Купить хлеб')).not.toBeInTheDocument()
  })
})

// npm test -- Notifier.spec.tsx --watch
