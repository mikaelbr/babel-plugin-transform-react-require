# babel-plugin-transform-react-require

Automatically require React (or other implementations) when using JSX.
This babel plugin inserts CommonJS style require where it detects
JSX and React isn't all ready reaquired (or imported using ES2015 syntax).

## Installation

```sh
$ npm install babel-plugin-transform-react-require
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
require("babel-core").transform("code", {
  plugins: ["transform-react-require"]
});
```

#### Options

Same as through the `.babelrc`, you can override defaults:


```js
require("babel-core").transform("code", {
  plugins: ["transform-react-require", {
    "identifier": "dom",
    "moduleName": "my-dom-library"
  }]
});
```
