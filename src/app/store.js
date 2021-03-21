import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "./reducers/userReducer";
import roomReducer from "./reducers/roomReducer";

export default configureStore({
    reducer: {
        counter: counterReducer,
        roomState: roomReducer,
        userState: userReducer,
    },
});
