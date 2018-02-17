var Promise = require('bluebird');
var serial = require('./serial');
var prompt = require('prompt');
var mouse = require('./mouse');

Promise.promisifyAll(prompt);

prompt.start()

serial.connect(async function() {
  await prompt.getAsync(['top'])
  var topTilt = serial.getTilt().roll;
  console.log(topTilt);

  await prompt.getAsync(['bottom']);
  var bottomTilt = serial.getTilt().roll;
  console.log(bottomTilt);

  await prompt.getAsync(['left'])
  var leftTilt = serial.getTilt().yaw;
  console.log(leftTilt);

  await prompt.getAsync(['right']);
  var rightTilt = serial.getTilt().yaw;
  console.log(rightTilt);

  //values to adjust
  y_offset = -bottomTilt;
  x_offset = -leftTilt;
  x_max = x_offset+rightTilt;
  y_max = y_offset+topTilt;

  var last = new Date()
  setInterval(function() {
    var cur = new Date();
    console.log((cur - last) + 'ms')
    last = cur;

    y_adjusted = Math.min(Math.max(serial.getTilt().roll + y_offset, 0),y_max);
    x_adjusted = Math.min(Math.max(serial.getTilt().yaw + x_offset, 0),x_max);
    console.log("x", x_adjusted, "y", y_adjusted);

    mouse.plot(x_adjusted/x_max, y_adjusted/y_max)
  }, 50)


  //
  // const top = topTilt + -bottomTilt;
  // const bottom = 0;
  // const right = rightTilt + -leftTilt;
  // const left = 0;
  // console.log(top, bottom, right, left);
});
