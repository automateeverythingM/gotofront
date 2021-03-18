import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import roomReducer from "./reducers/roomReducer";
import userReducer from "./reducers/userReducer";

export default configureStore({
    reducer: {
        counter: counterReducer,
        roomState: roomReducer,
        userState: userReducer,
    },
});
