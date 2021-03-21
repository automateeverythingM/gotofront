import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <Router>
                <Layout path="/">
                    <HomePage exact path="/" />
                    <Room path="/:roomname" />
                </Layout>
            </Router>
        </div>
    );
}

export default App;
