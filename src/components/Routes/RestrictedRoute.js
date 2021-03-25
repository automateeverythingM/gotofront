import { navigate, Redirect } from "@reach/router";

function RestrictedRoute({
    component: Component,
    restricted,
    fallbackRoute = "/",
    ...rest
}) {
    if (restricted) return <Redirect to={fallbackRoute} />;

    return <Component {...rest} />;
}
export default RestrictedRoute;
