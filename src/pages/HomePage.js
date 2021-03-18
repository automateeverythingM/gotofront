import { useState } from "react";
import { auth, githubProvider, googleProvider } from "../firebase";
import md5 from "md5";
import { useSelector } from "react-redux";
import { userSelector } from "../app/reducers/userReducer";

function HomePage() {
    const [errorMsg, setErrorMsg] = useState("");
    const user = useSelector(userSelector);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const { username, email, password } = e.target;

        auth.signInWithEmailAndPassword(email.value, password.value)
            .then((user) => {
                user.user.updateProfile({
                    displayName: username,
                    photoURL: `http://www.gravatar.com/avatar/${md5(
                        email
                    )}?d=identicon`,
                });
            })
            .catch((error) => {
                setErrorMsg(error.message);
            });
    };

    return (
        <div>
            <h1>HomePage</h1>
            {user ? (
                <div>
                    <h3>Currently login user: {user.displayName}</h3>
                    <img src={user.photoURL} alt="avatar" />
                </div>
            ) : (
                <h3>No User</h3>
            )}
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
                <button type="submit">Login with Email and Password</button>
            </form>
            <div style={{ marginTop: "2rem" }}>
                <br />
                <button onClick={handleSignInGoogle}>
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
