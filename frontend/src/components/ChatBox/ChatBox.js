import React, {useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';
import { ChatContainer,
         InfoButton,
         ConversationHeader,
         SendButton,
         MessageInput,
         Avatar,
         MessageList,
         Message } from "@chatscope/chat-ui-kit-react";

const chatServer = "http://localhost:8080";
const socket = io(chatServer);

function Chat(roomNumber) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messageReceived, setMessageReceived] = useState(null);
    const [message, setMessage] = useState("");
    const [room, setRoom] = useState(roomNumber ?? "");
    const [socketId, setSocketId] = useState(socket.id);
    const [messages, setMessages] = useState([]);

    const inputRef = useRef();

    useEffect(() => {
        socket.on('connect', () => {
            console.log("connected");
            setIsConnected(true);
            setSocketId(socket.id);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('receive', (message) => {
            console.log(message);
            setMessageReceived(message);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('receive');
        };
    }, []);

    const sendPing = () => {
        socket.emit('send', message, room);
    }

    const handleSend = message => {
        sendPing();
        setMessages([...messages, {
            message,
            direction: 'outgoing'
        }]);
        setMessage("");
        inputRef.current.focus();
    };

    return (
        <div>
            <p>Connected: { '' + isConnected }</p>
            <p>Socket id: { socketId }</p>
            <label>
                Socket to send to:
                <input type="text" value={room} onChange={e => setRoom(e.target.value)} />
            </label>
            <br/>
            <ChatContainer>
                <ConversationHeader>
                    {/*<Avatar src= name="Ur mUM" />*/}
                    <ConversationHeader.Content userName="Zoe" info="Beautiful day" />
                    <ConversationHeader.Actions>
                        <InfoButton />
                    </ConversationHeader.Actions>
                </ConversationHeader>

                <MessageList>
                    {messages.map((m, i) => <Message key={i} model={m} />)}
                </MessageList>

                <div as={MessageInput} style={{
                    display: "flex",
                    flexDirection: "row",
                    borderTop: "1px dashed #d1dbe4"
                }}>
                    <MessageInput ref={inputRef} onChange={msg => setMessage(msg)} value={message} sendButton={false} attachButton={false} onSend={handleSend} style={{
                        flexGrow: 1,
                        borderTop: 0,
                        flexShrink: "initial"
                    }} />
                    <SendButton onClick={() => handleSend(message)} disabled={message.length === 0} style={{
                        fontSize: "1.2em",
                        marginLeft: 0,
                        paddingLeft: "0.2em",
                        paddingRight: "0.2em"
                    }} />
                    <InfoButton onClick={() => alert("Important message!")} style={{
                        fontSize: "1.2em",
                        paddingLeft: "0.2em",
                        paddingRight: "0.2em"
                    }} />
                </div>
            </ChatContainer>
        </div>

    );
}

export default Chat;