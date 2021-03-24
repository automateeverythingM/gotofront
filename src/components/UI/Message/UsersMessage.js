import React from "react";

function UsersMessage({ message }) {
    const { content, user } = message;
    return (
        <div className="p-6 max-w-md mx-auto bg-gray-100 border border-gray-300 my-3 rounded-xl shadow-xl flex items-center space-x-4">
            <div className="flex-shrink-0">
                <img className="h-12 w-12" src={user.photoURL} alt="avatar" />
                <div className="text-yellow-600 font-bold">
                    {user.displayName}
                </div>
            </div>
            <div className="text-lg text-gray-600">{content}</div>
        </div>
    );
}

export default UsersMessage;
