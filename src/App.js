/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Router } from "@reach/router";
import Layout from "./pages/Layout";
import { onAuthChange } from "./utils/authHelpers";
import AuthRoute from "./components/Routes/AuthRoute";
import HomePage from "./pages/HomePage";
import Room from "./pages/Room";
import Loading from "./pages/Loading";
import RestrictedRoute from "./components/Routes/RestrictedRoute";
import { userSelector } from "./app/reducers/userReducer";
import "react-notifications-component/dist/theme.css";
const Login = lazy(() => import("./pages/Login"));
const Notification = lazy(() => import("react-notifications-component"));
function App() {
    const dispatch = useDispatch();
    const isUserAuth = useSelector(userSelector);
    useEffect(() => {
        const unsubscribe = onAuthChange(dispatch);
        return () => {
            unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <Suspense fallback={<Loading />}>
                <Notification />
                <Router>
                    <Layout path="/">
                        <HomePage exact path="/" />
                        <AuthRoute component={Room} path="/:roomname" />
                        <RestrictedRoute
                            component={Login}
                            restricted={isUserAuth}
                            path="/login"
                        />
                    </Layout>
                </Router>
            </Suspense>
        </div>
    );
}

export default App;
