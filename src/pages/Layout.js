import React from "react";

function Layout({ children, ...rest }) {
    return (
        <div>
            <div className="text-4xl">NAVBAR</div>
            {children}
            <div className="text-4xl">FOOTER</div>
        </div>
    );
}

export default Layout;
