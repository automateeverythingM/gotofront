import { createSlice } from "@reduxjs/toolkit";

const room = createSlice({
    name: "room",
    initialState: {
        roomName: "",
    },
    reducers: {
        setRoomName: (state, action) => {
            state.roomName = action.payload;
        },
    },
});

export default room.reducer;

export const { setRoomName } = room.actions;
