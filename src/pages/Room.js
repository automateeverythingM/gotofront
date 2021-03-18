import React from "react";

function Room(props) {
    const { roomname } = props;
    return (
        <div>
            <h1>Room name : {roomname}</h1>
        </div>
    );
}

export default Room;
