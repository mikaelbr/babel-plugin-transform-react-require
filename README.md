# babel-plugin-transform-react-require [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Automatically require React (or other implementations) when using JSX.
This babel plugin inserts CommonJS style require where it detects
JSX and React isn't already required (or imported using ES2015 syntax).

If you're using JSX in your React (or similar) components, you often
don't need the `React` module to anything else, and it will seem as
if you have an unused require-statement. When using something like
[`eslint`](http://eslint.org/) you'd have to add a rule saying
unused `React` should be ignored, but that's not always true.

With this module you'll no longer need to use this anti-pattern:

```jsx
let React = require('react'); // free, seemingly unused

module.exports = function MyComponent () {
  return (
   <h1>Hello World!</h1>
  );
};
```

You can instead let it be an implementation detail and write:

```jsx
module.exports = function MyComponent () {
  return (
   <h1>Hello World!</h1>
  );
};
```


## Installation

```sh
$ npm install --save babel-plugin-transform-react-require
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-react-require"]
}
```

#### Options

Not using React with JSX? You can define module name and module identifier
as options. For instance, if you are using `dom('div', {})` instead of
`React.createElement('div', {})`, you might want to require `dom`, instead
of `React`. In that case, you can override defaults by doing:

```json
{
  "plugins": [
    ["transform-react-require", {
      "identifier": "dom",
      "moduleName": "my-dom-library"
    }]
  ]
}
```

This would cause the plugin to automatically require `my-dom-library`,
when JSX syntax is detected, and store it in the identifier `dom`.

### Via CLI

```sh
$ babel --plugins transform-react-require script.js
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  plugins: ['transform-react-require']
});
```

#### Options

Same as through the `.babelrc`, you can override defaults:


```js
require('babel-core').transform('code', {
  plugins: ['transform-react-require', {
    'identifier': 'dom',
    'moduleName': 'my-dom-library'
  }]
});
```


[npm-url]: https://npmjs.org/package/babel-plugin-transform-react-require
[npm-image]: http://img.shields.io/npm/v/babel-plugin-transform-react-require.svg?style=flat
[npm-downloads]: http://img.shields.io/npm/dm/babel-plugin-transform-react-require.svg?style=flat

[travis-url]: http://travis-ci.org/mikaelbr/babel-plugin-transform-react-require
[travis-image]: http://img.shields.io/travis/mikaelbr/babel-plugin-transform-react-require.svg?style=flat
