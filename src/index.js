'use strict';

var template = require('babel-template');

var buildRequire = template(`
  require($0);
`);

export default function ({ types: t }) {
  return {
    visitor: {
      JSXElement() {
        this.hasJsx = true;
      },

      ImportDeclaration ({ node }, { opts: { moduleName = 'react' } }) {
        if (!node.source || !node.source.value) return;
        if (node.source.value !== moduleName) return;
        this.hasRequired = true;
      },

      CallExpression ({ node }, { opts: { moduleName = 'react' } }) {
        if (node.callee.name !== 'require') return;
        if (!node.arguments || !node.arguments[0]) return;
        if (node.arguments[0].value !== moduleName) return;
        this.hasRequired = true;
      },

      Program: {
        enter() {
          this.hasJsx = false;
          this.hasRequired = false;
        },

        exit(path, { opts: {
          identifier = 'React',
          moduleName = 'react'
        }}) {
          if (this.hasJsx && !this.hasRequired) {
            let ref = t.identifier(identifier);
            path.unshiftContainer('body', [
              t.variableDeclaration('var', [
                t.variableDeclarator(ref,
                  buildRequire(t.stringLiteral(moduleName)).expression)
              ])
            ]);
          }

        }
      }
    }
  };
}
