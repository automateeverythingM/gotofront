import classNames from "classnames";
import React from "react";

function ServerMessage({ message }) {
    const { content, type } = message;
    const classes = classNames("text-center font-bold", {
        "text-green-700": type.subType === "JOIN",
        "text-red-700": type.subType === "LEFT",
    });

    return <div className={classes}>{content}</div>;
}

export default ServerMessage;
