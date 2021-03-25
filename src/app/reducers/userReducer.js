import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: true,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoadingUser: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export default user.reducer;

export const { setUser, setLoadingUser } = user.actions;

export const userSelector = (state) => state.userState.user;
export const authLoading = (state) => state.userState.loading;
