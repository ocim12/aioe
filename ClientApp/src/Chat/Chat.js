import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import './Chat.css'
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import AuthService from '../services/AuthService'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
            return () =>{ connection.send('Disconnect')}
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
        
        <div className= 'chat' >
            
            <Tabs>
                <TabList>
                <Tab>Chat</Tab>
                <Tab>Users Online</Tab>
                </TabList>

                <TabPanel>
                <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
            
        </div>
        /* <div className='home'>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat} />
        </div> */
        
    );
};

export default Chat;