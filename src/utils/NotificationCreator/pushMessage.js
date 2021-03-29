import { store } from "react-notifications-component";

export const pushNotification = ({
    title,
    message,
    type,
    position,
    duration,
    content,
}) => {
    store.addNotification({
        title: title || "",
        message: <pre>{message}</pre>,
        type: type || "info",
        insert: position || "top",
        container: "center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: duration || 3000,
            pauseOnHover: true,
        },
        content: content || null,
    });
};
