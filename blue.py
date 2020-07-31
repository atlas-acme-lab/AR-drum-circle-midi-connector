import bluetooth

# source for this code from here https://stackoverflow.com/questions/10922319/initializing-bluetooth-connection-androidclient-to-pythonserver-on-pc
# same for android code
name="bt_server"
target_name="test"
uuid="e0b52790-d10d-11ea-8b6e-0800200c9a66"

def runServer():
    # you had indentation problems on this line:
    serverSocket=bluetooth.BluetoothSocket(bluetooth.RFCOMM)
    port=bluetooth.PORT_ANY
    serverSocket.bind(("",port))
    print("Listening for connections on port: ")   

    # wait for a message to be sent to this socket only once
    serverSocket.listen(1)
    port=serverSocket.getsockname()[1]

    # you were 90% there, just needed to use the pyBluez command:
    bluetooth.advertise_service( serverSocket, "SampleServer",
                        service_id = uuid,
                        service_classes = [ uuid, bluetooth.SERIAL_PORT_CLASS ],
                        profiles = [ bluetooth.SERIAL_PORT_PROFILE ] 
                        )

    inputSocket, address=serverSocket.accept()
    print("Got connection with")
    msgCount = 0
    try:
      while True:
          data = inputSocket.recv(1024)
          msgCount += 1

          inputSocket.send(("" + str(msgCount) + ",0,1,0").encode())
          if not data:
              break
          print("Received", data)
    except OSError:
        pass  
  
    inputSocket.close()
    serverSocket.close() 


runServer()
# need to run first: sudo hciconfig hci0 piscan