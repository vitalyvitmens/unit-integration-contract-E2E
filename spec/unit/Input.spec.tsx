import { render, screen } from '@testing-library/react'
import { Input } from 'src/components/Input'
import ue from '@testing-library/user-event'

describe('Поле ввода', () => {
  const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
  })

  it('Поле доступно для ввода', async () => {
    const fn = jest.fn()
    render(<Input value="" onChange={fn} />)

    const inputEl = screen.getByRole('textbox')
    await userEvent.type(inputEl, 'Пример заголовка задачи')

    expect(fn).toHaveBeenCalledTimes(23)
  })

  it('Ограничение на ввод более 32 символов', async () => {
    const fn = jest.fn()
    render(
      <Input
        value="Пример заголовка, содержащего больше 32 символов"
        onChange={fn}
      />
    )

    const hintEl = screen.getByTestId('input-hint-text')

    expect(hintEl.innerHTML).not.toBe('')
  })
})

// npm test -- Input.spec.tsx --watch
