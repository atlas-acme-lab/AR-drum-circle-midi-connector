# AR Drum MIDI Bluetooth Server

The following instructions have only been tested with Ubuntu Linux, different operating systems may have different requirements. [Node MIDI](https://www.npmjs.com/package/midi), [Node Bluetooth Serial Port](https://www.npmjs.com/package/bluetooth-serial-port) 

## Installation
- Make sure your system is set up for the required libraries. On Linux you may need to install additional Bluetooth packages [Node MIDI](https://www.npmjs.com/package/midi), [Node Bluetooth Serial Port](https://www.npmjs.com/package/bluetooth-serial-port)
- Run `npm install` in a terminal

## Running the Application
- Make sure your MIDI drum is plugged in
- Make sure bluetooth is turned on
- Make sure your Android Device is Paired with this computer
- Run `sudo hciconfig hci0 piscan` in a terminal to make sure your Bluetooth is discoverable (might be linux only)
- Run `sudo npm start` in a terminal
- You should see a message indicating that the server is running