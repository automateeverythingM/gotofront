import { nanoid } from "nanoid";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../index";
import {
  clearState,
  messagesSelector,
  pushMessage,
  pushNewUser,
  pushReceivedMessage,
  removeUser,
  setInitialStateOfRoom,
} from "../app/reducers/roomReducer";
import { userSelector } from "../app/reducers/userReducer";
import { usersSelector } from "../app/reducers/roomReducer";
import { debounce } from "loadsh";

function Room(props) {
  const { roomname } = props;
  const dispatch = useDispatch();
  const messages = useSelector(messagesSelector);
  const user = useSelector(userSelector);
  const users = useSelector(usersSelector);
  const [statusDisplay, setStatusDisplay] = useState();
  const [userTyping, setUserTyping] = useState(false);

  const debounceStartTyping = useMemo(
    () =>
      debounce(
        () => {
          console.log("start typing");
          socket.emit("typing", {
            roomName: roomname,
            displayName: "marko",
          });
        },
        3000,
        {
          leading: true,
          trailing: false,
        }
      ),
    []
  );
  const debounceStopTyping = useMemo(
    () =>
      debounce(() => {
        console.log("stopTyping");
        socket.emit("stopTyping", {
          roomName: roomname,
        });
      }, 3000),
    []
  );

  useEffect(() => {
    socket.emit("join room", { roomName: roomname, user });

    socket.on("user join room", (user) => {
      dispatch(pushNewUser(user));
    });

    socket.on("user left room", (user) => {
      dispatch(removeUser(user.uid));
      setStatusDisplay(`user: ${user.displayName} left room`);
    });

    socket.on("userTyping", (data) => {
      console.log("typing");
      setUserTyping(data);
    });

    socket.on("stopTyping", () => {
      setUserTyping(null);
    });

    // socket.on("updateMessages", (data) => {
    //     dispatch(pushReceivedMessage(data));
    // });

    // socket.on("newUser", (user) => {
    //     dispatch(pushNewUser(user));
    // });

    // socket.on("initialState", (data) => {
    //     dispatch(setInitialStateOfRoom(data));
    // });

    // socket.on("userLeft", (id) => {
    //     dispatch(removeUser(id));
    // });

    return () => {
      socket.emit("leaveRoom", { roomName: roomname, user });
      socket.removeAllListeners();
      dispatch(clearState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { messageInput } = e.target;
    const newMsg = { content: messageInput.value, uid: nanoid(), user };
    dispatch(pushMessage({ message: newMsg, roomName: roomname }));
    messageInput.value = "";
  };

  const handleInputChange = () => {
    debounceStartTyping();
    debounceStopTyping();
    // debouncedStopTyping(() => {

    //   console.log("object");
    //   socket.emit("stopTyping", {
    //     roomName: roomname,
    //   });
    // }, 3000);
  };

  return (
    <div>
      <h1>
        Room name : <span style={{ color: "red" }}>{roomname}</span>
        <div>
          <h3>Users in this room</h3>
          <div>{statusDisplay}</div>
          {/* <ul style={{ background: "teal" }}>
            {users.map(({ photoURL, displayName, uid }) => (
              <li key={uid}>
                <div>
                  <img
                    src={photoURL}
                    alt="avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "9999px",
                    }}
                  />
                  <span>{displayName}</span> :
                </div>
              </li>
            ))}
          </ul> */}
        </div>
        <div>{userTyping}</div>
        <div style={{ height: "500px", overflow: "auto" }}>
          {messages.map(({ content, uid, user }) => (
            <div key={uid}>
              <img
                src={user.photoURL}
                alt="avatar"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "9999px",
                }}
              />
              <span>{user.displayName}</span> :<span key={uid}>{content}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="messageInput"
            style={{ fontSize: "3rem" }}
            autoComplete="off"
            onChange={(e) => handleInputChange(e)}
          />
        </form>
      </h1>
    </div>
  );
}

export default Room;
