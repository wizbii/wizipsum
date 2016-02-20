/*!
 * wizipsum - v2.4.0
 * We all have funny mates, right?
 * https://github.com/wizbii/wizipsum
 *
 * @author Wizbii <dev@wizbii.com>
 * @license MIT
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wizipsum"] = factory();
	else
		root["wizipsum"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var random = __webpack_require__(1);
	var sample = __webpack_require__(13);
	var startCase = __webpack_require__(28);

	function pickNSplice(origin) {
	  var ar = [];

	  return function () {
	    if (ar.length === 0) ar = origin.slice();

	    var index = random(0, ar.length - 1);
	    return ar.splice(index, 1)[0];
	  };
	}

	module.exports = function (strs) {
	  function paragraph() {
	    var nb = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	    var wrappers = arguments.length <= 1 || arguments[1] === undefined ? ['', '\n\n'] : arguments[1];
	    var averageLength = arguments.length <= 2 || arguments[2] === undefined ? 400 : arguments[2];

	    var result = [];
	    var picker = pickNSplice(data());

	    for (var i = 0; i < nb; i++) {
	      var str = '';
	      while (str.length < averageLength) {
	        str += picker() + ' ';
	      }result.push(str.trim());
	    }

	    return wrap(result, wrappers);
	  }

	  function sentence() {
	    var nb = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	    var wrappers = arguments.length <= 1 || arguments[1] === undefined ? ['', ' '] : arguments[1];

	    var result = [];
	    var picker = pickNSplice(data());

	    for (var i = 0; i < nb; i++) {
	      result.push(picker());
	    }

	    return wrap(result, wrappers);
	  }

	  function title() {
	    var nb = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	    var wrappers = arguments.length <= 1 || arguments[1] === undefined ? ['', ''] : arguments[1];

	    return startCase(sentence(nb, wrappers));
	  }

	  function word() {
	    var nb = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	    var wrappers = arguments.length <= 1 || arguments[1] === undefined ? ['', ' '] : arguments[1];

	    var result = [];
	    var picker = pickNSplice(data());

	    for (var i = 0; i < nb; i++) {
	      var randomStr = picker();
	      var words = randomStr.split(' ');
	      var _word = sample(words).toLowerCase().replace(/[^-a-z0-9]/g, '');

	      result.push(_word);
	    }

	    return wrap(result, wrappers);
	  }

	  function data() {
	    if (arguments.length > 0) strs = arguments[0];
	    return strs;
	  }

	  function wrap(result, wrappers) {
	    return result.map(function (str) {
	      return wrappers[0] + str + wrappers[1];
	    }).join('');
	  }

	  return { paragraph: paragraph, sentence: sentence, title: title, word: word, data: data };
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseRandom = __webpack_require__(2),
	    isIterateeCall = __webpack_require__(3),
	    toNumber = __webpack_require__(12);

	/** Built-in method references without a dependency on `root`. */
	var freeParseFloat = parseFloat;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min,
	    nativeRandom = Math.random;

	/**
	 * Produces a random number between the inclusive `lower` and `upper` bounds.
	 * If only one argument is provided a number between `0` and the given number
	 * is returned. If `floating` is `true`, or either `lower` or `upper` are floats,
	 * a floating-point number is returned instead of an integer.
	 *
	 * **Note:** JavaScript follows the IEEE-754 standard for resolving
	 * floating-point values which can produce unexpected results.
	 *
	 * @static
	 * @memberOf _
	 * @category Number
	 * @param {number} [lower=0] The lower bound.
	 * @param {number} [upper=1] The upper bound.
	 * @param {boolean} [floating] Specify returning a floating-point number.
	 * @returns {number} Returns the random number.
	 * @example
	 *
	 * _.random(0, 5);
	 * // => an integer between 0 and 5
	 *
	 * _.random(5);
	 * // => also an integer between 0 and 5
	 *
	 * _.random(5, true);
	 * // => a floating-point number between 0 and 5
	 *
	 * _.random(1.2, 5.2);
	 * // => a floating-point number between 1.2 and 5.2
	 */
	function random(lower, upper, floating) {
	  if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
	    upper = floating = undefined;
	  }
	  if (floating === undefined) {
	    if (typeof upper == 'boolean') {
	      floating = upper;
	      upper = undefined;
	    } else if (typeof lower == 'boolean') {
	      floating = lower;
	      lower = undefined;
	    }
	  }
	  if (lower === undefined && upper === undefined) {
	    lower = 0;
	    upper = 1;
	  } else {
	    lower = toNumber(lower) || 0;
	    if (upper === undefined) {
	      upper = lower;
	      lower = 0;
	    } else {
	      upper = toNumber(upper) || 0;
	    }
	  }
	  if (lower > upper) {
	    var temp = lower;
	    lower = upper;
	    upper = temp;
	  }
	  if (floating || lower % 1 || upper % 1) {
	    var rand = nativeRandom();
	    return nativeMin(lower + rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1))), upper);
	  }
	  return baseRandom(lower, upper);
	}

	module.exports = random;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeFloor = Math.floor,
	    nativeRandom = Math.random;

	/**
	 * The base implementation of `_.random` without support for returning
	 * floating-point numbers.
	 *
	 * @private
	 * @param {number} lower The lower bound.
	 * @param {number} upper The upper bound.
	 * @returns {number} Returns the random number.
	 */
	function baseRandom(lower, upper) {
	  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
	}

	module.exports = baseRandom;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var eq = __webpack_require__(4),
	    isArrayLike = __webpack_require__(5),
	    isIndex = __webpack_require__(11),
	    isObject = __webpack_require__(9);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
	  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || value !== value && other !== other;
	}

	module.exports = eq;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getLength = __webpack_require__(6),
	    isFunction = __webpack_require__(8),
	    isLength = __webpack_require__(10);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	    return value != null && !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
	}

	module.exports = isArrayLike;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(7);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(9);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFunction = __webpack_require__(8),
	    isObject = __webpack_require__(9);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? other + '' : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}

	module.exports = toNumber;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseRandom = __webpack_require__(2),
	    isArrayLike = __webpack_require__(5),
	    values = __webpack_require__(14);

	/**
	 * Gets a random element from `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to sample.
	 * @returns {*} Returns the random element.
	 * @example
	 *
	 * _.sample([1, 2, 3, 4]);
	 * // => 2
	 */
	function sample(collection) {
	    var array = isArrayLike(collection) ? collection : values(collection),
	        length = array.length;

	    return length > 0 ? array[baseRandom(0, length - 1)] : undefined;
	}

	module.exports = sample;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseValues = __webpack_require__(15),
	    keys = __webpack_require__(17);

	/**
	 * Creates an array of the own enumerable property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object ? baseValues(object, keys(object)) : [];
	}

	module.exports = values;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayMap = __webpack_require__(16);

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function (key) {
	    return object[key];
	  });
	}

	module.exports = baseValues;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseHas = __webpack_require__(18),
	    baseKeys = __webpack_require__(19),
	    indexKeys = __webpack_require__(20),
	    isArrayLike = __webpack_require__(5),
	    isIndex = __webpack_require__(11),
	    isPrototype = __webpack_require__(27);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  for (var key in object) {
	    if (baseHas(object, key) && !(skipIndexes && (key == 'length' || isIndex(key, length))) && !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && key in object && getPrototypeOf(object) === null;
	}

	module.exports = baseHas;

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @type Function
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	module.exports = baseKeys;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseTimes = __webpack_require__(21),
	    isArguments = __webpack_require__(22),
	    isArray = __webpack_require__(25),
	    isLength = __webpack_require__(10),
	    isString = __webpack_require__(26);

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) && (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}

	module.exports = indexKeys;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLikeObject = __webpack_require__(23);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(5),
	    isObjectLike = __webpack_require__(24);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	module.exports = isObjectLike;

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(25),
	    isObjectLike = __webpack_require__(24);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
	}

	module.exports = isString;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (str) {
	  return str.replace(/(^|[-\s])([a-z\u00C0-\u017F])/g, function ($0, $1, $2) {
	    return $1 + $2.toUpperCase();
	  });
	};

/***/ }
/******/ ])
});
;