import { navigate } from "@reach/router";
import md5 from "md5";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../app/reducers/userReducer";
import { auth, githubProvider, googleProvider } from "../../firebase";

function Login(props) {
    const [errorMsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();
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

        navigate(props.location.state?.backTo || "/");
    };

    const handleSignInGoogle = async () => {
        await auth.signInWithPopup(googleProvider).catch((error) => {
            setErrorMsg(error.message);
        });
        navigate(props.location.state?.backTo || "/");
    };
    const handleSignInGithub = async () => {
        await auth.signInWithPopup(githubProvider).catch((error) => {
            setErrorMsg(error.message);
        });
        navigate(props.location.state?.backTo || "/");
    };

    return (
        <div>
            <h1 className="font-bold text-4xl  mb-7">Login Page</h1>
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

export default Login;
