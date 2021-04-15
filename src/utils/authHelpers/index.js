import { socket } from "../..";
import { setUser, setLoadingUser } from "../../app/reducers/userReducer";
import { auth } from "../../firebase";

export const onAuthChange = (dispatch) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            dispatch(
                setUser({
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    uid: user.uid,
                })
            );
        } else {
            dispatch(setUser(null));
        }

        dispatch(setLoadingUser(false));
        return unsubscribe;
    });
};
