var Promise = require('bluebird');
var serial = require('./serial');
var prompt = require('prompt');

Promise.promisifyAll(prompt);

prompt.start()

serial.connect(async function() {
  await prompt.getAsync(['top'])
  var topTilt = serial.getTilt();
  console.log(topTilt);

  await prompt.getAsync(['bottom']);
  var bottomTilt = serial.getTilt();
  console.log(bottomTilt);

  const top = topTilt.pitch + -bottomTilt.pitch;
  const bottom = 0;
  console.log(top, bottom);

  process.exit()
});
