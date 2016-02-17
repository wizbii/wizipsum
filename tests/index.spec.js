/* global describe, beforeEach, it, expect */

const wizipsum = require('../src')
let data
let generator

describe('wizipsum', function () {
  beforeEach(function () {
    data = ['This is some random foos.', 'There are also bars.', 'But you might actually prefer quzs.']
    generator = wizipsum(data)
  })

  it('should return the api', function () {
    expect(Object.keys(generator)).toEqual(['paragraph', 'sentence', 'title', 'word', 'data'])
  })

  describe('the paragraph function', function () {
    it('should return a number of paragraphs', function () {
      expect(generator.paragraph(3).match(/\n\n/g).length).toBe(3)
    })

    it('should wrap the paragraphs with given wrappers', function () {
      expect(/^<p>.+<\/p>$/.test(generator.paragraph(1, ['<p>', '</p>']))).toBe(true)
    })

    it('should return paragraphs with a given average length', function () {
      // 35 is the largest string's length
      expect(generator.paragraph(1, ['', ''], 10).length <= 35).toBe(true)
    })
  })

  describe('the sentence function', function () {
    it('should return a number of sentences', function () {
      expect(generator.sentence(1, ['', 'NL']).match(/NL/g).length).toBe(1)
      expect(generator.sentence(2, ['', 'NL']).match(/NL/g).length).toBe(2)
    })

    it('should wrap the sentences with given wrappers', function () {
      expect(/^<p>.+<\/p>$/.test(generator.sentence(1, ['<p>', '</p>']))).toBe(true)
    })
  })

  describe('the word function', function () {
    it('should return a number of words', function () {
      expect(generator.word(1).match(/ /g).length).toBe(1)
      expect(generator.word(3).match(/ /g).length).toBe(3)
      expect(generator.word(23).match(/ /g).length).toBe(23)
    })

    it('should wrap the words with given wrappers', function () {
      expect(/^<p>.+<\/p>$/.test(generator.word(1, ['<p>', '</p>']))).toBe(true)
    })
  })

  describe('the data function', function () {
    it('should return the list of strings', function () {
      expect(generator.data()).toBe(data)
    })

    it('should set the list of strings', function () {
      const otherData = ['foo', 'bar']
      generator.data(otherData)

      expect(generator.data()).toBe(otherData)
    })
  })
})
