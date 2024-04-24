const sum = (a: number, b: number) => a + b

describe.skip('Дополнительный метод describe 1', () => {
  it.todo('Дополнительный метод todo')
  it.skip('Дополнительный метод skip', () => {})
  xit('Дополнительный метод xit', () => {})
  xtest('Дополнительный метод xtest', () => {})

  it('Просто тест 1', () => {})
  it('Просто тест 2', () => {})

  it.only('Дополнительный метод only', () => {})
  fit('Дополнительный метод fit', () => {})
})

describe.skip('Дополнительный метод describe 2', () => {
  it.failing('Дополнительный метод failing', () => {
    expect(2).toBe(3)
  })

  it('Просто тест 3', () => {})
  it('Просто тест 4', () => {})

  xit.each([
    [1, 2, 3],
    [0, 0, 1],
    [-1, 1, 0],
  ])('Дополнительный метод each %i + %i = %i', (a, b, expected) => {
    expect(sum(a, b)).toBe(expected)
  })
})

describe.each([[1, 2, 3]])(
  'Each describe 3 [%i + %i = %i]',
  (a, b, expected) => {
    it('Дополнительный метод each', () => {
      expect(sum(a, b)).toBe(expected)
    })

    it('Дополнительный второй each', () => {
      expect(sum(a, b)).toBe(expected)
    })
  }
)

// npm test -- Utils.spec.tsx --watch
