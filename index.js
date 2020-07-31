var server = new(require('bluetooth-serial-port')).BluetoothSerialPortServer();

// Got this from here: https://www.famkruithof.net/uuid/uuidgen
var UUID = 'e0b52790-d10d-11ea-8b6e-0800200c9a66';
 
// For now just proof that we are recieving data from the Android Client
server.on('data', function(buffer) {
    console.log('Received data from client: ' + buffer);
});

let hasClient = false;
// Start a server and locate the first connect client
server.listen((clientAddress) => {
    hasClient = true;
    console.log('Client: ' + clientAddress + ' connected!');
}, function(error){
    console.error("Something wrong happened!:" + error);
}, {uuid: UUID} );

const midi = require('midi');
 
// Set up a new input.
const input = new midi.Input();
 
// Count the available MIDI input ports.
console.log(input.getPortCount());
 
let midiPort = -1;
// Get the name of a specified input port.
for (let i = 0; i < input.getPortCount(); i++) {
  console.log(input.getPortName(i), input.getPortName(i).includes('MultiPad'));
  // find our specific MIDI device (the drum pad) and store it's id so we can connect
  if (input.getPortName(i).includes('MultiPad')) midiPort = i;
}

if (midiPort !== -1) {
  // Callback for a MIDI message
  input.on('message', (deltaTime, message) => {
    if (hasClient) {
        // If there is a connected client forward any MIDI messages to it
        server.write(Buffer.from(message.join(',') + '-'), function (err, bytesWritten) {
            if (err) {
                console.log('Error!');
            } else {
                console.log('Send ' + bytesWritten + ' to the client!');
            }
        });
    }

    // For debugging purposes log every MIDI note received
    console.log(`m: ${message} d: ${deltaTime}`);
  });
  
  // Open the first available MIDI input port.
  input.openPort(midiPort);
  // This makes it accept all message types
  input.ignoreTypes(false, false, false);
}
