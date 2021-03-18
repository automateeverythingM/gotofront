import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            console.log("🚀 ~ file: userReducer.js ~ line 10 ~ action", action);
            state.user = action.payload;
        },
    },
});

export default user.reducer;

export const { setUser } = user.actions;

export const userSelector = (state) => state.userState.user;
