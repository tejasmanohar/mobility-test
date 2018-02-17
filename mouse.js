var robot = require('robotjs');
var screenSize = robot.getScreenSize();
var height = (screenSize.height);
var width = screenSize.width;

var mouse = robot.getMousePos();
for (var y = mouse.y; y < height; y++) {
  robot.moveMouse(mouse.x, y);
}
