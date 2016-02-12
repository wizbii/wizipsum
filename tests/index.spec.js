/* global describe, beforeEach, it, expect */

const wizipsum = require('../src')
let data

describe('wizipsum', function () {
  beforeEach(function () {
    data = ['Test', 'Test']
  })

  it('should generate lipsum text from given data', function () {
    const generator = wizipsum(data)
    expect(generator().length >= 400).toBe(true)
  })

  it('should set the defaults options', function () {
    const generator = wizipsum(data, 2, ['', '<br>'], 10)
    expect(generator()).toBe('Test Test Test<br>Test Test Test<br>')
  })

  it('should still be able to overwrite the defaults options', function () {
    const generator = wizipsum(data, 2, ['', '<br>'], 10)
    expect(generator(3, ['<p>', '</p>'], 5)).toBe('<p>Test Test</p><p>Test Test</p><p>Test Test</p>')
  })
})
