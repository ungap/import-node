require('basichtml').init();

var importNode = require('../cjs');
test();

if (typeof process === 'object') {
  delete require.cache[require.resolve('../cjs')];
  document.importNode = importNode;
  importNode = require('../cjs');
  test();
  delete require.cache[require.resolve('../cjs')];
  document.importNode = function () {
    return {childNodes: []};
  };
  importNode = require('../cjs');
  test();
}

function test() {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(document.createTextNode('g'));
  fragment.appendChild(document.createTextNode(''));
  var imported = importNode.call(document, fragment);
  console.assert(imported !== fragment);
  console.assert(imported.childNodes.length === 0);
  imported = importNode.call(document, fragment, true);
  console.assert(imported.childNodes.length === 2);
}
