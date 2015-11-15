'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      JSXElement: function JSXElement() {
        this.hasJsx = true;
      },
      ImportDeclaration: function ImportDeclaration(_ref2, _ref3) {
        var node = _ref2.node;
        var _ref3$opts$moduleName = _ref3.opts.moduleName;
        var moduleName = _ref3$opts$moduleName === undefined ? 'react' : _ref3$opts$moduleName;

        if (!node.source || !node.source.value) return;
        if (node.source.value !== moduleName) return;
        this.hasRequired = true;
      },
      CallExpression: function CallExpression(_ref4, _ref5) {
        var node = _ref4.node;
        var _ref5$opts$moduleName = _ref5.opts.moduleName;
        var moduleName = _ref5$opts$moduleName === undefined ? 'react' : _ref5$opts$moduleName;

        if (node.callee.name !== 'require') return;
        if (!node.arguments || !node.arguments[0]) return;
        if (node.arguments[0].value !== moduleName) return;
        this.hasRequired = true;
      },

      Program: {
        enter: function enter() {
          this.hasJsx = false;
          this.hasRequired = false;
        },
        exit: function exit(path, _ref6) {
          var _ref6$opts = _ref6.opts;
          var _ref6$opts$identifier = _ref6$opts.identifier;
          var identifier = _ref6$opts$identifier === undefined ? 'React' : _ref6$opts$identifier;
          var _ref6$opts$moduleName = _ref6$opts.moduleName;
          var moduleName = _ref6$opts$moduleName === undefined ? 'react' : _ref6$opts$moduleName;

          if (this.hasJsx && !this.hasRequired) {
            var ref = t.identifier(identifier);
            path.unshiftContainer('body', [t.variableDeclaration('var', [t.variableDeclarator(ref, buildRequire(t.stringLiteral(moduleName)).expression)])]);
          }
        }
      }
    }
  };
};

var template = require('babel-template');

var buildRequire = template('\n  require($0);\n');
