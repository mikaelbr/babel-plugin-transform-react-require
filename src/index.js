'use strict';

var template = require('babel-template');

var buildRequire = template(`
  require($0);
`);

export default function ({ types: t }) {
  let hasJsx = false;
  let hasRequired = false;

  return {
    visitor: {
      JSXElement() { hasJsx = true; },

      ImportDeclaration ({ node }, { opts: { moduleName = 'react' } }) {
        if (!node.source || !node.source.value) return;
        if (node.source.value !== moduleName) return;
        hasRequired = true;
      },

      CallExpression ({ node }, { opts: { moduleName = 'react' } }) {
        if (node.callee.name !== 'require') return;
        if (!node.arguments || !node.arguments[0]) return;
        if (node.arguments[0].value !== moduleName) return;
        hasRequired = true;
      },

      Program: {
        exit(path, { opts: {
          identifier = 'React',
          moduleName = 'react'
        }}) {
          if (hasJsx && !hasRequired) {
            let ref = t.identifier(identifier);
            path.unshiftContainer('body', [
              t.variableDeclaration('var', [
                t.variableDeclarator(ref,
                  buildRequire(t.stringLiteral(moduleName)).expression)
              ])
            ]);
          }

          hasJsx = false;
          hasRequired = false;
        }
      }
    }
  };
}
