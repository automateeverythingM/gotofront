import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../index";

export const roomSlice = createSlice({
    name: "room",
    initialState: {
        roomName: "",
        messages: [],
        users: [],
        roomCleaned: false,
    },
    reducers: {
        setRoomName: (state, action) => {
            state.roomName = action.payload;
        },
        pushMessage: (state, action) => {
            const { message: msg, roomName } = action.payload;
            state.messages.push(msg);
            const message = { ...msg, user: msg.user.uid };
            socket.emit("newMessage", { message, roomName });
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
            const { uid } = action.payload;
            state.users = state.users.filter((user) => user.uid !== uid);
        },
        setInitialStateOfRoom: (state, action) => {
            const { messages, usersList } = action.payload;

            state.messages = messages;
            state.users = usersList;
        },
        setRoomCleaned: (state, action) => {
            state.roomCleaned = action.payload;
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
    setRoomCleaned,
} = roomSlice.actions;

export const messagesSelector = (state) => state.roomState.messages;
export const cleanRoomSelector = (state) => state.roomState.roomCleaned;
export const usersSelector = (state) => state.roomState.users;
export default roomSlice.reducer;

export const emitMessage = (message) => (dispatch) => {
    socket.emit("newMessage", message);

    dispatch(pushMessage(message));
};
