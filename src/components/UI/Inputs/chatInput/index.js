import { useState } from "react";
import EditorJs from "react-editor-js";

function ChatInput() {
    const [data, setData] = useState();
    return (
        <EditorJs
            data={data}
            onChange={(e) => {
                console.log(e);
            }}
        />
    );
}

export default ChatInput;
