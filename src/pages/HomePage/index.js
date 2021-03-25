import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { userSelector } from "../../app/reducers/userReducer";
import { Link, navigate } from "@reach/router";

function HomePage() {
    const user = useSelector(userSelector);

    const handleChangeRoom = (e) => {
        e.preventDefault();
        const { roomName } = e.target;
        if (roomName.value) navigate(`/${roomName.value}`);
    };

    const handleSignOut = () => {
        auth.signOut();
    };

    return (
        <div>
            <h1 className="font-bold text-4xl mb-7">HomePage</h1>

            {user ? (
                <div>
                    <div>
                        <h3>Currently login user: {user.displayName}</h3>
                        <img
                            className="mx-auto"
                            src={user.photoURL}
                            alt="avatar"
                        />
                    </div>
                    <button onClick={handleSignOut}>Sign out</button>
                </div>
            ) : (
                <div>
                    <h3>No User</h3>
                    <button>
                        <Link to="/login">Login</Link>
                    </button>
                </div>
            )}
            <form onSubmit={handleChangeRoom} style={{ margin: "2rem auto" }}>
                <label htmlFor="roomname">Enter room name</label>
                <input
                    id="roomname"
                    placeholder="Enter room name"
                    name="roomName"
                    type="text"
                    className="block mx-auto w-100 text-5xl px-1"
                    autoComplete="off"
                />
            </form>
        </div>
    );
}

export default HomePage;
