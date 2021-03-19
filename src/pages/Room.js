import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "..";
import {
    messagesSelector,
    pushMessage,
    pushReceivedMessage,
} from "../app/reducers/roomReducer";
import { userSelector } from "../app/reducers/userReducer";

function Room(props) {
    const { roomname } = props;
    const dispatch = useDispatch();
    const messages = useSelector(messagesSelector);
    const user = useSelector(userSelector);

    useEffect(() => {
        socket.emit("join room", { roomName: roomname });
        socket.on("updateMessages", (data) => {
            dispatch(pushReceivedMessage(data));
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { messageInput } = e.target;
        const newMsg = { content: messageInput.value, id: nanoid(), user };
        dispatch(pushMessage(newMsg));
        messageInput.value = "";
    };

    return (
        <div>
            <h1>
                Room name : <span style={{ color: "red" }}>{roomname}</span>
                <div style={{ height: "500px", overflow: "auto" }}>
                    {messages.map(({ content, id, user }) => (
                        <div>
                            <div>
                                <img
                                    src={user.photoURL}
                                    alt="avatar"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "9999px",
                                    }}
                                />
                                <span>{user.displayName}</span> :
                                <span key={id}>{content}</span>
                            </div>
                        </div>
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
