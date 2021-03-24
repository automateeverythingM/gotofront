import classNames from "classnames";
import React from "react";

function ServerMessage({ message }) {
    const { content, type } = message;
    console.log(
        "🚀 ~ file: ServerMessage.js ~ line 6 ~ ServerMessage ~ type",
        type
    );

    const classes = classNames("text-center font-bold", {
        "text-green-700": type.subType === "JOIN",
        "text-red-700": type.subType === "LEFT",
    });

    return <div className={classes}>{content}</div>;
}

export default ServerMessage;
