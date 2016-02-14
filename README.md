# wizipsum

We all have funny mates, right?

* [Demo](https://wizbii.github.io/wizipsum)
* [Introduction](https://github.com/wizbii/wizipsum#introduction)
* [DIY](https://github.com/wizbii/wizipsum#diy)
* [Installation](https://github.com/wizbii/wizipsum#installation)
* [API](https://github.com/wizbii/wizipsum#api)

## Introduction

Surely, [Khaled](http://khaledipsum.com/) has some cool slangs but we all have funny mates so why couldn't we build our own lorem ipsum?
That's what wizipsum is: a lorem ipsum generator builder.
It's dead simple, tested and easy to get started.

## DIY

If you want to build your own lorem ipsum without worrying about hosting while being able to use it everywhere thanks to the *chrome extension*, head to the [demo](https://wizbii.github.io/wizipsum) ;).

## Installation

1. Get it via:
  * `npm install wizipsum`
  * [direct download](https://raw.githubusercontent.com/wizbii/wizipsum/master/dist/wizipsum.js)

```javascript
const wizipsum = require('wizipsum')
const generator = wizipsum(['Fill this array', 'with any slangs', 'you want'])

console.log(generator())
```

## API

### wizipsum

wizipsum is a function that accepts four arguments:

1. **data** (required): A list of strings
2. **paragraphs** (default: `1`): The number of paragraphs to generate
3. **wrappers** (default: `['', '\n']`): An array of two items, the first one will be added to the start of each paragraph while the other one will be added to the end. That's pretty useful if you want to create `<p></p>` elements.
4. **maxlength** (default: `400`): A paragrah's maxlength

It returns a function that generates random text from **data**.

#### Example

```javascript
const wizipsum = require('wizipsum')
const generator = wizipsum(['Foo', 'Bar'], 2, ['<p>', '</p>'], 10)

generator()
// '<p>Bar Foo Bar</p><p>Bar Bar Foo</p>'
```

The "generator" function also accepts **paragraphs**, **wrappers** and **maxlength** if you want to overwrite the default for a call:

```javascript
const wizipsum = require('wizipsum')
const generator = wizipsum(['Foo', 'Bar'], 2, ['<p>', '</p>'], 10)

generator(4, ['', '<br>'], 4)
// 'Bar Foo<br>Foo Foo<br>Foo Bar<br>Bar Bar<br>'
```
