import React from "react";

function Room(props) {
    const { roomname } = props;
    return (
        <div>
            <h1>
                Room name : <span style={{ color: "red" }}>{roomname}</span>
            </h1>
        </div>
    );
}

export default Room;
