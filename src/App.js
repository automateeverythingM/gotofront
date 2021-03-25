/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { Router } from "@reach/router";
import Layout from "./pages/Layout";
import { onAuthChange } from "./utils/authHelpers";
import AuthRoute from "./components/Routes/AuthRoute";
import HomePage from "./pages/HomePage";
import Room from "./pages/Room";
import Loading from "./pages/Loading";
import RestrictedRoute from "./components/Routes/RestrictedRoute";
const Login = lazy(() => import("./pages/Login"));
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = onAuthChange(dispatch);
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="App">
            <Suspense fallback={<Loading />}>
                <Router>
                    <Layout path="/">
                        <HomePage exact path="/" />
                        <RestrictedRoute
                            path="/r"
                            component={Login}
                            restricted
                        />
                        <AuthRoute component={Room} path="/:roomname" />
                        <Login path="/login" />
                    </Layout>
                </Router>
            </Suspense>
        </div>
    );
}

export default App;
