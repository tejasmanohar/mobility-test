var robot = require('robotjs');
var screenSize = robot.getScreenSize();
var height = (screenSize.height);
var width = screenSize.width;

exports.plot = function plot(xIn, yIn) {
  var adjustedX = xIn*width;
  var adjustedY = (1-yIn)*height;
  robot.moveMouse(adjustedX, adjustedY);
}
