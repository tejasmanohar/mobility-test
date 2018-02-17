var SerialPort = require("serialport");
var portName = "/dev/tty.usbmodem1411";
var queue_max = 5;

exports.connect = function start(f) {
  var port = SerialPort(portName, {
    baudRate: 9600
  });

  port.on("open", function() {
    console.log("port opened");
  });

  var done = false;
  port.on("data", function(data) {
    if (!done) {
      f();
      done = true;
    }

    buffer(data.toString());
  });
};

exports.getTilt = function() {
  return Object.assign({}, currentTilt);
};

var buf = "";
var currentTilt = {
  pitch: 0,
  roll: 0,
  yaw: 0
};

var pitchStore = []
var yawStore = []
var rollStore = []

function buffer(next) {
  for (var i = 0; i < next.length; i++) {
    var char = next[i];
    if (char == ";") {
      var parts = buf.split(",");
      if (parts.length == 3) {

        var pitch = Number(parts[0]);
        var roll = Number(parts[1]);
        var yaw = Number(parts[2]);

        push(pitchStore, -pitch);
        push(yawStore, -yaw);
        push(rollStore, -roll);

        currentTilt.pitch = getAverage(pitchStore);
        currentTilt.yaw = getAverage(yawStore);
        currentTilt.roll = getAverage(rollStore);

        if (
          Number.isNaN(currentTilt.pitch) ||
          Number.isNaN(currentTilt.roll) ||
          Number.isNaN(currentTilt.yaw)
        ) {
          console.log("Found NaN", buf);
        }
      }

      buf = "";
    } else if (".-,0123456789".indexOf(char) != -1) {
      buf += char;
    }
  }
}

var getAverage = arr => arr.reduce((x, y) => x + y) / arr.length;
var push = (arr, elem) => {
  arr.splice(0, 0, elem);
  if (arr.length > queue_max) {
    arr.pop();
  }
};