import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../index";

export const roomSlice = createSlice({
    name: "room",
    initialState: {
        roomName: "",
        messages: [],
        users: [],
    },
    reducers: {
        setRoomName: (state, action) => {
            state.roomName = action.payload;
        },
        pushMessage: (state, action) => {
            const { message, roomName } = action.payload;
            state.messages.push(message);
            socket.emit("newMessage", message);
            // socket.emit("newMessage", message, roomName);
        },
        pushReceivedMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        clearState: (state) => {
            state.messages = [];
            state.users = [];
            state.roomName = "";
        },
        pushNewUser: (state, action) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(
                (user) => user.uid !== action.payload
            );
        },
        setInitialStateOfRoom: (state, action) => {
            const { messages, users } = action.payload;

            state.messages = messages;
            state.users = users;
        },
    },
});

export const {
    setRoomName,
    pushMessage,
    pushReceivedMessage,
    setInitialStateOfRoom,
    pushNewUser,
    removeUser,
    clearState,
} = roomSlice.actions;

export const messagesSelector = (state) => state.roomState.messages;
export const usersSelector = (state) => state.roomState.users;
export default roomSlice.reducer;

export const emitMessage = (message) => (dispatch) => {
    socket.emit("newMessage", message);

    dispatch(pushMessage(message));
};
