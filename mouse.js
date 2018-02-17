var robot = require('robotjs');
var screenSize = robot.getScreenSize();
var height = (screenSize.height);
var width = screenSize.width;
//
// var mouse = robot.getMousePos();
// for (var y = mouse.y; y < height; y++) {
//   robot.moveMouse(mouse.x, y);
// }

exports.plot = function plot(xIn, yIn) {
  var adjustedX = xIn*width;
  var adjustedY = (1-yIn)*height;
  robot.moveMouse(adjustedX, adjustedY);
}
