require('./environment.js');

const Canvas = require('../js/canvas.js');
canvas = new Canvas();

test('will have canvas and ctx objects', () => {
  expect(canvas.canvas).toBe(document.getElementById('canvas'))
});
