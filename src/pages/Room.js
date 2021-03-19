import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "..";
import {
    messagesSelector,
    pushMessage,
    pushReceivedMessage,
} from "../app/reducers/roomReducer";

function Room(props) {
    const { roomname } = props;
    const dispatch = useDispatch();
    const messages = useSelector(messagesSelector);

    useEffect(() => {
        socket.emit("join room", { roomName: roomname });
        socket.on("updateMessages", (data) => {
            console.log(
                "🚀 ~ file: Room.js ~ line 16 ~ socket.on ~ data",
                data
            );
            dispatch(pushReceivedMessage(data));
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { messageInput } = e.target;
        const newMsg = { content: messageInput.value, id: nanoid() };
        dispatch(pushMessage(newMsg));
        messageInput.value = "";
    };

    return (
        <div>
            <h1>
                Room name : <span style={{ color: "red" }}>{roomname}</span>
                <div style={{ height: "500px", overflow: "auto" }}>
                    {messages.map(({ content, id }) => (
                        <p key={id}>{content}</p>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="messageInput"
                        style={{ fontSize: "3rem" }}
                    />
                </form>
            </h1>
        </div>
    );
}

export default Room;
