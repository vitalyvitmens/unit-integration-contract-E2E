//! Используй тестовую среду Node.js, иначе будет конфликт между средой тестирования Jest и библиотекой ws, которую используемой Puppeteer 
import puppeteer from 'puppeteer'

let page

it('e2e добавление задачи', async () => {
  const browser = await puppeteer.launch()
  page = await browser.newPage()

  await page.goto('http://localhost:3000/')

  await page.waitForSelector('.input-field-element')
  await page.type('.input-field-element', 'купи молоко')

  await page.click('.button-with-icon')

  const html = await page.$eval(
    '.item-wrapper > label',
    (el: Element) => el.innerHTML
  )

  expect(html).toBe('купи молоко')
})

// npm test -- e2e.spec.tsx
