// need to run first: sudo hciconfig hci0 piscan
var server = new(require('bluetooth-serial-port')).BluetoothSerialPortServer();
 
var CHANNEL = 10; // My service channel. Defaults to 1 if omitted.
var UUID = 'e0b52790-d10d-11ea-8b6e-0800200c9a66'; // My own service UUID. Defaults to '1101' if omitted
 
server.on('data', function(buffer) {
    console.log('Received data from client: ' + buffer);
 
    // // ...
 
    // console.log('Sending data to the client');
    // server.write(Buffer.from('...'), function (err, bytesWritten) {
    //     if (err) {
    //         console.log('Error!');
    //     } else {
    //         console.log('Send ' + bytesWritten + ' to the client!');
    //     }
    // });
});
 
let hasClient = false;
server.listen((clientAddress) => {
    hasClient = true;
    console.log('Client: ' + clientAddress + ' connected!');
}, function(error){
    console.error("Something wrong happened!:" + error);
}, {uuid: UUID} );

const midi = require('midi');
 
// Set up a new input.
const input = new midi.Input();
 
// Count the available input ports.
console.log(input.getPortCount());
 
let midiPort = -1;
// Get the name of a specified input port.
for (let i = 0; i < input.getPortCount(); i++) {
  console.log(input.getPortName(i), input.getPortName(i).includes('MultiPad'));
  if (input.getPortName(i).includes('MultiPad')) midiPort = i;
}

if (midiPort !== -1) {
  // Configure a callback.
  input.on('message', (deltaTime, message) => {
    if (hasClient) {
        server.write(Buffer.from(message.join(',') + '-'), function (err, bytesWritten) {
            if (err) {
                console.log('Error!');
            } else {
                console.log('Send ' + bytesWritten + ' to the client!');
            }
        });
    }
    console.log(`m: ${message} d: ${deltaTime}`);
  });
  
  // Open the first available input port.
  input.openPort(midiPort);
  
  // Sysex, timing, and active sensing messages are ignored
  // by default. To enable these message types, pass false for
  // the appropriate type in the function below.
  // Order: (Sysex, Timing, Active Sensing)
  // For example if you want to receive only MIDI Clock beats
  // you should use
  // input.ignoreTypes(true, false, true)
  input.ignoreTypes(false, false, false);
  
  // ... receive MIDI messages ...
  
  // Close the port when done.
  // setTimeout(function() {
  //   input.closePort();
  // }, 100000);
}