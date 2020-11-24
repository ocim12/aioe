import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import classes from './Chat.css'
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import AuthService from '../services/AuthService'

const Chat = () => {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        var tok = AuthService.getCurrentToken();

        if (tok) {
            const newConnection = new HubConnectionBuilder()
                .withUrl('/chat', { accessTokenFactory: () => tok })
                .withAutomaticReconnect()
                .build();

            setConnection(newConnection);
        }
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                })
                .catch(e => console.log('Connection failed: ', e));


            connection.on('RecieveMessage', RecieveMessage => {

                const updatedChat = [...latestChat.current];
                updatedChat.push(RecieveMessage);
                setChat(updatedChat);
            })

            connection.on('LoggedUsers', LoggedUsers => {
                console.log(LoggedUsers);
            })
            
        }

    }, [connection]);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };
        if (connection) {
            if (connection.connectionStarted) {
                try {
                    await connection.send('SendMessage', chatMessage);
                }
                catch(e) {
                    console.log(e);
                }
            }
            else {
                alert('No connection to server yet.');
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    return (
        <div className='home'>
            
                <ChatInput sendMessage={sendMessage} />
                <hr />
                <ChatWindow chat={chat} />
                <AppBar position="static">
  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
    <Tab label="Item One" {...a11yProps(0)} />
    <Tab label="Item Two" {...a11yProps(1)} />
    <Tab label="Item Three" {...a11yProps(2)} />
  </Tabs>
</AppBar>
<TabPanel value={value} index={0}>
  Item One
</TabPanel>
<TabPanel value={value} index={1}>
  Item Two
</TabPanel>
<TabPanel value={value} index={2}>
  Item Three
</TabPanel>
        </div>
    );
};

export default Chat;