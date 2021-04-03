import { useState } from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tools";

function EditorJsIndex() {
    const [data, setData] = useState();
    return (
        <EditorJs holder="holder" data={data} tools={EDITOR_JS_TOOLS}>
            <div
                id="holder"
                className="border-2 border-gray-700 w-96 mx-auto pb-0"
            ></div>
        </EditorJs>
    );
}
export default EditorJsIndex;
