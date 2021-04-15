import ServerMessage from "./ServerMessage";
import UsersMessage from "./UsersMessage";

const MESSAGE_TYPE = { SERVER: "SERVER", USER: "USER" };
const Message = ({ message }) => {
    console.log("🚀 ~ file: Message.js ~ line 6 ~ Message ~ message", message);
    const { type } = message;
    switch (type.name) {
        case MESSAGE_TYPE.SERVER:
            return <ServerMessage key={message.uid} message={message} />;
        case MESSAGE_TYPE.USER:
            return <UsersMessage key={message.uid} message={message} />;
        default:
            return null;
    }
};

export default Message;
