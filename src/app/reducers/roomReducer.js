import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../index";
export const roomSlice = createSlice({
    name: "room",
    initialState: {
        roomName: "",
        messages: [],
    },
    reducers: {
        setRoomName: (state, action) => {
            state.roomName = action.payload;
        },
        pushMessage: (state, action) => {
            state.messages.push(action.payload);
            socket.emit("newMessage", action.payload);
        },
        pushReceivedMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
});

export const {
    setRoomName,
    pushMessage,
    pushReceivedMessage,
} = roomSlice.actions;

export const messagesSelector = (state) => state.roomState.messages;
export default roomSlice.reducer;

export const emitMessage = (message) => (dispatch) => {
    socket.emit("newMessage", message);

    dispatch(pushMessage(message));
};
