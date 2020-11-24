import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

function App() {
    const [connection, setConnection] = useState<HubConnection | null>(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:58196/notificationhub')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then((result) => {
                    console.log('Connected: ', result);

                    connection.on('ReceiveMessage', (message) => {
                        console.log(message);
                    });
                })
                .catch((e) => console.log('Connection failed: ', e));
        }
    }, [connection]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
