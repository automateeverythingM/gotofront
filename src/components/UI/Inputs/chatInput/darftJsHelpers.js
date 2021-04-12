import { EditorState, Modifier } from "draft-js";

/**
 *
 * @param {string} characterToInsert content to insert into editor state.
 * @param {EditorState} editorState
 * @returns new editor state
 */
export const insertCharacter = (characterToInsert, editorState) => {
    const currentContent = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();
    const newContent = Modifier.replaceText(
        currentContent,
        currentSelection,
        characterToInsert
    );

    const newEditorState = EditorState.push(
        editorState,
        newContent,
        "insert-characters"
    );

    const newEditorStateWithFocus = EditorState.moveFocusToEnd(newEditorState);

    return newEditorStateWithFocus;
};
