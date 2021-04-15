import { navigate, Redirect } from "@reach/router";
import { useSelector } from "react-redux";
import { authLoading } from "../../app/reducers/userReducer";
import Loading from "../../pages/Loading";

function RestrictedRoute({
    component: Component,
    restricted,
    fallbackRoute = "/",
    ...rest
}) {
    const userLoading = useSelector(authLoading);

    if (userLoading) return <Loading />;
    if (restricted) return <Redirect to={fallbackRoute} noThrow />;

    return <Component {...rest} />;
}
export default RestrictedRoute;
