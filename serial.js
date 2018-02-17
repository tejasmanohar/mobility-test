var SerialPort = require('serialport');
var portName = '/dev/tty.usbmodem1421';

exports.connect = function start(f) {
  var port = SerialPort(portName, {
    baudRate: 9600,
  })

  port.on('open', function() {
    console.log('port opened')
  });

  var done = false;
  port.on('data', function (data) {
    if (!done) {
      f()
      done = true;
    }

    buffer(data.toString());
  });
}

exports.getTilt = function() {
  return Object.assign({}, currentTilt);
}

var buf = '';
var currentTilt = {
  pitch: 0,
  roll: 0,
  yaw: 0
};

function buffer(next) {
  for (var i = 0; i < next.length; i++) {
    var char = next[i];
    if (char == ';') {
      var parts = buf.split(',');
      if (parts.length == 3) {
        var pitch = Number(parts[0]);
        var roll = Number(parts[1]);
        var yaw = Number(parts[2]);

        // if (pitch != 0) {
          currentTilt.pitch = -pitch
        // }

        // if (roll != 0) {
          currentTilt.roll = -roll;
        // }

        // if (yaw != 0) {
          currentTilt.yaw = -yaw;
        // }

        // currentTilt = {
        //   pitch: ,
        //   roll: Number(parts[1]),
        //   yaw: Number(parts[2])
        // }

        if (Number.isNaN(currentTilt.pitch) || Number.isNaN(currentTilt.roll)
          || Number.isNaN(currentTilt.yaw)) {
          console.log('Found NaN', buf);
        }

        // console.log(pitch, roll, yaw)
      }

      buf = '';
    } else if ('.-,0123456789'.indexOf(char) != -1) {
      buf += char;
    }
    // else {
    //   console.log('other char', char)
    // }
  }
}

// var robot = require("robotjs");
//
// // Speed up the mouse.
// robot.setMouseDelay(2);
//
// var twoPI = Math.PI * 2.0;
// var screenSize = robot.getScreenSize();
// var height = (screenSize.height / 2) - 10;
// var width = screenSize.width;
//
// for (var x = 0; x < width; x++)
// {
// 	y = height * Math.sin((twoPI * x) / width) + height;
// 	robot.moveMouse(x, y);
// }
