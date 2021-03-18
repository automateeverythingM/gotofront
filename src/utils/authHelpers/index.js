import { setUser } from "../../app/reducers/userReducer";
import { auth } from "../../firebase";

export const onAuthChange = (dispatch) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            dispatch(
                setUser({
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                })
            );
        } else {
            setUser(null);
        }

        return unsubscribe;
    });
};
