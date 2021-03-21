import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "..";
import {
    clearState,
    messagesSelector,
    pushMessage,
    pushNewUser,
    pushReceivedMessage,
    removeUser,
    setInitialStateOfRoom,
} from "../app/reducers/roomReducer";
import { userSelector } from "../app/reducers/userReducer";
import { usersSelector } from "../app/reducers/roomReducer";

function Room(props) {
    const { roomname } = props;
    const dispatch = useDispatch();
    const messages = useSelector(messagesSelector);
    const user = useSelector(userSelector);
    const users = useSelector(usersSelector);

    useEffect(() => {
        socket.emit("join room", { roomName: roomname, user });
        socket.on("updateMessages", (data) => {
            dispatch(pushReceivedMessage(data));
        });

        socket.on("newUser", (user) => {
            dispatch(pushNewUser(user));
        });

        socket.on("initialState", (data) => {
            dispatch(setInitialStateOfRoom(data));
        });

        socket.on("userLeft", (id) => {
            dispatch(removeUser(id));
        });

        return () => {
            socket.emit("leaveRoom", roomname, user);
            dispatch(clearState());
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { messageInput } = e.target;
        const newMsg = { content: messageInput.value, id: nanoid(), user };
        dispatch(pushMessage({ message: newMsg, roomName: roomname }));
        messageInput.value = "";
    };

    return (
        <div>
            <h1>
                Room name : <span style={{ color: "red" }}>{roomname}</span>
                <div>
                    <h3>Users in this room</h3>
                    <ul style={{ background: "teal" }}>
                        {users.map(({ photoURL, displayName }) => (
                            <li>
                                <div>
                                    <img
                                        src={photoURL}
                                        alt="avatar"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "9999px",
                                        }}
                                    />
                                    <span>{displayName}</span> :
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ height: "500px", overflow: "auto" }}>
                    {messages.map(({ content, id, user }) => (
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
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="messageInput"
                        style={{ fontSize: "3rem" }}
                        autoComplete="off"
                    />
                </form>
            </h1>
        </div>
    );
}

export default Room;
