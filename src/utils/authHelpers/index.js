import { setUser } from "../../app/reducers/userReducer";
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

        return unsubscribe;
    });
};
