//Global Vars
let ip = '192.168.0.164';
let port = '8080';
let sendCommand = 'stream;';
let socketConnection;
let connectStatus = 'Closed';
let consoleOutput = '';

//Doc Elements
const ipInput = document.getElementById('ipInput');
const portInput = document.getElementById('portInput');
const sendInput = document.getElementById('sendInput');
const sendSocket = document.getElementById('sendSocket');
const startSocket = document.getElementById('startSocket');
const stopSocket = document.getElementById('stopSocket');
const connectStatusIndicator = document.getElementById('connectStatusIndicator');
const consoleArea = document.getElementById('consoleArea');

//Functions
const updateConnectStatusIndicator = () => {
    connectStatusIndicator.innerHTML = connectStatus;
}

const updateConsole = () => {
    consoleArea.value = consoleOutput;

    consoleArea.scrollTop = consoleArea.scrollHeight;
}


//Init
ipInput.value = ip;
portInput.value = port;
sendInput.value = sendCommand;
updateConnectStatusIndicator();
updateConsole();

//Handlers
ipInput.addEventListener('input', (e) => {
    ip = e.target.value;
});

portInput.addEventListener('input', (e) => {
    port = e.target.value;
});

sendInput.addEventListener('input', (e) => {
    sendCommand = e.target.value;
});

sendSocket.addEventListener('click', () => {
    socketConnection.send(sendCommand);
});

startSocket.addEventListener('click', () => {
    socketConnection = new WebSocket(`ws://${ip}:${port}`);

    socketConnection.onopen = (e) => {
        console.log('Websocket Opened', e);

        connectStatus = 'Open';
        updateConnectStatusIndicator();
    }

    socketConnection.onclose = (e) => {
        connectStatus = 'Closed';
        updateConnectStatusIndicator();

        console.log(`Websocket Connection Closed`, e)
    }

    socketConnection.onerror = (e) => {
        connectStatus = 'Closed';
        updateConnectStatusIndicator();

        console.log(`Websocket Connection Error`, e)
    }

    socketConnection.onmessage = (msg) => {
        consoleOutput += msg.data;

        updateConsole();
    }
})

stopSocket.addEventListener('click', () => {
    if(!socketConnection) return;

    socketConnection.close();
    socketConnection = undefined;
})
