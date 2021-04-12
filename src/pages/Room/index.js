import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../";
import {
    cleanRoomSelector,
    clearState,
    messagesSelector,
    pushMessage,
    pushNewUser,
    pushReceivedMessage,
    removeUser,
    setInitialStateOfRoom,
    setRoomCleaned,
} from "../../app/reducers/roomReducer";
import { userSelector } from "../../app/reducers/userReducer";
import { usersSelector } from "../../app/reducers/roomReducer";
import useTypingDebounce from "../../utils/hooks/useTypingDebounce";
import Message from "../../components/UI/Message/Message";
import Timer from "../../components/Timer";
import ChatInput from "../../components/UI/Inputs/chatInput";
import EditorJsIndex from "../../components/UI/Inputs/chatInput/editorjsindex";
import TinyEditor from "../../components/UI/Inputs/chatInput/tinyEditor";

function Room(props) {
    const { roomname } = props;
    const dispatch = useDispatch();
    const messages = useSelector(messagesSelector);
    const user = useSelector(userSelector);
    const users = useSelector(usersSelector);
    const roomCleaned = useSelector(cleanRoomSelector);
    const [typing, setTyping] = useState(false);
    const [timer, setTimer] = useState(0);
    const typingDebounce = useTypingDebounce(
        () =>
            socket.emit("typing", {
                displayName: user.displayName,
                roomName: roomname,
            }),
        () => socket.emit("stopTyping", { roomName: roomname }),
        3000
    );

    useEffect(() => {
        //if user refresh page will track is cleanUp run
        if (!roomCleaned) cleanUp();
        socket.emit("join room", { roomName: roomname, user });
        socket.on("updateMessages", (data) => {
            dispatch(pushReceivedMessage(data.message));
        });

        socket.on("newUser", (data) => {
            const { message } = data;

            dispatch(pushNewUser(message.user));
            dispatch(pushReceivedMessage(message));
        });

        socket.on("initialState", (data) => {
            dispatch(setInitialStateOfRoom(data));
        });

        socket.on("userLeft", (data) => {
            const { message } = data;
            dispatch(removeUser(message.user));
            dispatch(pushReceivedMessage(message));
        });

        socket.on("userTyping", (data) => {
            const { displayName } = data;
            setTyping(`${displayName} is typing...`);
        });

        socket.on("userStopTyping", () => {
            setTyping(false);
        });

        return cleanUp;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = () => {
        typingDebounce();
    };

    const cleanUp = () => {
        if (!roomCleaned) dispatch(setRoomCleaned(true));
        socket.emit("leaveRoom", { roomName: roomname, user });
        socket.removeAllListeners();
        dispatch(clearState());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { messageInput } = e.target;
        const newMsg = {
            content: messageInput.value,
            uid: nanoid(),
            user,
            type: { name: "USER" },
        };
        dispatch(pushMessage({ message: newMsg, roomName: roomname }));
        messageInput.value = "";
    };

    return (
        <div>
            <h1>
                Room name : <span style={{ color: "red" }}>{roomname}</span>
                <div>
                    <h3>Users in this room</h3>
                    <div>Timer</div>
                    <Timer timer={timer} setTimer={setTimer} />
                    <ChatInput />
                    <EditorJsIndex />
                    {/* <TinyEditor /> */}
                    <div className="bg-yellow-100">
                        <h3 className="font-bold text-xl">Users in room</h3>
                        {users.map(({ photoURL, displayName, uid }) => (
                            <div className="inline-block mx-2" key={uid}>
                                <img
                                    src={photoURL}
                                    alt="avatar"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "9999px",
                                    }}
                                />
                                <span>{displayName}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="flex flex-col justify-end bg-blue-100"
                    style={{ height: "500px", overflow: "auto" }}
                >
                    <div className=" overflow-y-auto">
                        {messages.map((message) => (
                            <Message message={message} />
                        ))}
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="bg-green-100">
                    <div style={{ color: "#000000" }}>{typing}</div>
                    <input
                        type="text"
                        name="messageInput"
                        className="border border-gray-500 text-4xl p-1"
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                </form>
            </h1>
        </div>
    );
}

export default Room;
