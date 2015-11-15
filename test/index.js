var babel = require('babel-core');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var pluginPath = path.join(__dirname, '..', 'src', 'index');

var options = {
  'plugins': [
    pluginPath,
    'transform-es2015-modules-commonjs',
    'transform-react-jsx'
  ]
};

describe('transform-react-require', function () {
  var folders = fs.readdirSync(path.join(__dirname, 'fixtures'));
  folders.forEach(function (folder) {
    if (folder.substring(0, 1) === '.') return;
    it(folder.replace(/-/g, ' '), function () {
      var base = path.join(__dirname, 'fixtures', folder);
      var actual = fs.readFileSync(path.join(base, 'actual.js')).toString('utf-8');
      var expected = fs.readFileSync(path.join(base, 'expected.js')).toString('utf-8');

      var possibleOptions, result;

      try {
        possibleOptions = fs.readFileSync(path.join(base, 'options.json')).toString('utf-8');
      } catch (e) {
        possibleOptions = void 0;
      }

      if (!possibleOptions) {
        result = babel.transform(actual, options);
      } else {
        var extraOpts = JSON.parse(possibleOptions);
        let myOpts = Object.assign({}, options, {
          'plugins': [
            [options.plugins[0]].concat(extraOpts[0]),
            options.plugins[1],
            [options.plugins[2]].concat(extraOpts[1]),
          ]
        });
        result = babel.transform(actual, myOpts);
      }
      assert.equal(result.code.trim(), expected.trim());
    });
  });
});
