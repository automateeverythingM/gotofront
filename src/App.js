import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import "./App.css";
import { setUser } from "./app/reducers/userReducer";
import { auth, googleProvider } from "./firebase";
import { Router } from "@reach/router";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import Room from "./pages/Room";
import { onAuthChange } from "./utils/authHelpers";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = onAuthChange(dispatch);
        return () => {
            unsubscribe();
        };
    }, []);

    const handleSignIn = () => {
        auth.signInWithPopup(googleProvider);
    };

    return (
        <div className="App">
            <Router>
                <Layout path="/">
                    <HomePage exact path="/" />
                    <Room path="/:roomname" />
                </Layout>
            </Router>
            <button onClick={handleSignIn}>sign in</button>
        </div>
    );
}

export default connect()(App);
