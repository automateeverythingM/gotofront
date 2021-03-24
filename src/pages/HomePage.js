import { useState } from "react";
import { auth, githubProvider, googleProvider } from "../firebase";
import md5 from "md5";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../app/reducers/userReducer";
import { navigate } from "@reach/router";
import "./homepage.css";

function HomePage() {
    const [errorMsg, setErrorMsg] = useState("");
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    const handleSignInGoogle = () => {
        auth.signInWithPopup(googleProvider).catch((error) => {
            setErrorMsg(error.message);
        });
    };
    const handleSignInGithub = () => {
        auth.signInWithPopup(githubProvider).catch((error) => {
            setErrorMsg(error.message);
        });
    };

    const handleSignOut = () => {
        auth.signOut();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, password } = e.target;

        const userRef = await auth.createUserWithEmailAndPassword(
            email.value,
            password.value
        );

        await userRef.user.updateProfile({
            displayName: username.value,
            photoURL: `http://www.gravatar.com/avatar/${md5(
                email.value
            )}?d=identicon`,
        });

        const { displayName, photoURL } = userRef.user;

        dispatch(setUser({ displayName, photoURL }));

        // auth.signInWithEmailAndPassword(email.value, password.value)
        // .catch((error) => {
        //     setErrorMsg(error.message);
        // });
    };

    const handleChangeRoom = (e) => {
        e.preventDefault();
        const { roomName } = e.target;
        if (roomName.value) navigate(`/${roomName.value}`);
    };

    return (
        <div>
            <h1>HomePage</h1>
            {user ? (
                <div>
                    <h3>Currently login user: {user.displayName}</h3>
                    <img className="mx-auto" src={user.photoURL} alt="avatar" />
                </div>
            ) : (
                <h3>No User</h3>
            )}
            <form onSubmit={handleChangeRoom} style={{ margin: "2rem auto" }}>
                <label htmlFor="roomname">Enter room name</label>
                <input
                    id="roomname"
                    placeholder="Enter room name"
                    name="roomName"
                    type="text"
                    style={{
                        display: "block",
                        margin: "auto",
                        width: "400px",
                        fontSize: "2rem",
                    }}
                    autoComplete="off"
                />
            </form>
            <form onSubmit={handleSubmit}>
                <label>
                    UserName
                    <input
                        name="username"
                        type="text"
                        style={{
                            display: "block",
                            margin: "auto",
                            width: "400px",
                        }}
                    />
                </label>
                <label>
                    Email
                    <input
                        name="email"
                        type="email"
                        style={{
                            display: "block",
                            margin: "auto",
                            width: "400px",
                        }}
                    />
                </label>
                <label>
                    Password
                    <input
                        name="password"
                        type="password"
                        style={{
                            display: "block",
                            margin: "auto",
                            width: "400px",
                        }}
                    />
                </label>
                <button type="submit">Register with Email and Password</button>
                <br />
                {/* <button type="submit">Login with Email and Password</button> */}
            </form>
            <div style={{ marginTop: "2rem" }}>
                <br />
                <button className="btn" onClick={handleSignInGoogle}>
                    sign in with Google
                </button>
                <br />
                <button onClick={handleSignInGithub}>
                    sign in with Github
                </button>
                <br />
                <button onClick={handleSignOut}>sign out</button>
                <br />
            </div>
            <div
                style={{
                    border: "1px solid red",
                    padding: "2rem",
                    width: "400px",
                    margin: "2rem auto",
                }}
            >
                <h3>Google Firebase Error</h3>
                <p style={{ color: "red" }}>{errorMsg}</p>
            </div>
        </div>
    );
}

export default HomePage;
