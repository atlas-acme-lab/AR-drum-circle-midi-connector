// need to run first: sudo hciconfig hci0 piscan
var server = new(require('bluetooth-serial-port')).BluetoothSerialPortServer();
 
var CHANNEL = 10; // My service channel. Defaults to 1 if omitted.
var UUID = 'e0b52790-d10d-11ea-8b6e-0800200c9a66'; // My own service UUID. Defaults to '1101' if omitted
 
server.on('data', function(buffer) {
    console.log('Received data from client: ' + buffer);
 
    // ...
 
    console.log('Sending data to the client');
    server.write(Buffer.from('...'), function (err, bytesWritten) {
        if (err) {
            console.log('Error!');
        } else {
            console.log('Send ' + bytesWritten + ' to the client!');
        }
    });
});
 
server.listen(function (clientAddress) {
    console.log('Client: ' + clientAddress + ' connected!');
}, function(error){
    console.error("Something wrong happened!:" + error);
}, {uuid: UUID} );
