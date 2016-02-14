# wizipsum

We all have funny mates, right?

* [Demo](https://wizbii.github.io/wizipsum)
* [Introduction](https://github.com/wizbii/wizipsum#introduction)
* [DIY](https://github.com/wizbii/wizipsum#diy)
* [Installation](https://github.com/wizbii/wizipsum#installation)
* [Documentation](https://github.com/wizbii/wizipsum#documentation)

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

## Documentation

wizipsum is a function that accepts only one argument and returns the api.

**Arguments**

1. **strs** (required) - An array of strings

**Example**

```javascript
const wizipsum = require('wizipsum')
const generator = wizipsum(['Some string there.', 'And some more here.'])
```

### API

#### `.paragraph(nb = 1, wrappers = ['', '\n\n'], averageLength = 400)`

Returns a number of paragraphs composed of random strings (from *strs*).

**Arguments**

1. **nb** (default: `1`) - The number of paragraphs to generate.
2. **wrappers** (default: `['', '\n\n']`) - The first item will be added to the start of each paragraphs while the second is added to the end.
3. **averageLength** (default: `400`) - The average length of each paragraphs.

**Example**

```javascript
const wizipsum = require('wizipsum')
const generator = wizipsum(['Some string there.', 'And some more here.'])

generator.paragraph(2, ['<p>', '</p>'], 30)
// '<p>Some string there. And some more here.</p><p>And some more here. And some more here.</p>'
```

#### `.sentence(nb = 1, wrappers = ['', ' '])`

Returns a number of sentences composed of random strings (from *strs*).

**Arguments**

1. **nb** (default: `1`) - The number of paragraphs to generate.
2. **wrappers** (default: `['', ' ']`) - The first item will be added to the start of each paragraphs while the second is added to the end.

**Example**

```javascript
const wizipsum = require('wizipsum')
const generator = wizipsum(['Some string there.', 'And some more here.'])

generator.sentence(2, ['<p>', '</p>'])
// '<p>Some string there.</p><p>And some more here.</p>'
```

#### `.word(nb = 1, wrappers = ['', ' '])`

Returns a number of words composed of random strings (from *strs*).

**Arguments**

1. **nb** (default: `1`) - The number of paragraphs to generate.
2. **wrappers** (default: `['', ' ']`) - The first item will be added to the start of each paragraphs while the second is added to the end.

**Example**

```javascript
const wizipsum = require('wizipsum')
const generator = wizipsum(['Some string there.', 'And some more here.'])

generator.word(3, ['<strong>', '<strong>'])
// '<strong>string</strong><strong>some</strong><strong>there</strong>'
```
