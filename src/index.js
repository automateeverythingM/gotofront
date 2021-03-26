import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { io } from "socket.io-client";
import ErrorBoundary from "./components/ErrorBoundries";
export const socket = io("http://localhost:5001");

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </Provider>,
    document.getElementById("root")
);
