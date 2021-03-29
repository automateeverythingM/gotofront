import { navigate } from "@reach/router";
import { useSelector } from "react-redux";
import { authLoading, userSelector } from "../../app/reducers/userReducer";
import Loading from "../../pages/Loading";

function AuthRoute({
    component: Component,
    fallbackRoute = "/login",
    ...rest
}) {
    const userLoading = useSelector(authLoading);
    const isUserAuth = useSelector(userSelector);

    if (userLoading) return <Loading />;

    if (isUserAuth) return <Component {...rest} />;

    throw navigate(fallbackRoute, {
        state: { backTo: rest?.uri },
        replace: true,
    });
}

export default AuthRoute;
