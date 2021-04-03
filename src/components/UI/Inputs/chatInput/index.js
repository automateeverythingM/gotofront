import { EditorState, Modifier } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
    defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/emoji/lib/plugin.css";
import "draft-js/dist/Draft.css";
import "emoji-mart/css/emoji-mart.css";
import { insertCharacter } from "./darftJsHelpers";
import { Picker } from "emoji-mart";

const mentions = [
    {
        name: "Matthew Russell",
        link: "https://twitter.com/mrussell247",
        avatar:
            "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
    },
    {
        name: "Julian Krispel-Samsel",
        link: "https://twitter.com/juliandoesstuff",
        avatar: "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400",
    },
    {
        name: "Jyoti Puri",
        link: "https://twitter.com/jyopur",
        avatar: "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400",
    },
    {
        name: "Max Stoiber",
        link: "https://twitter.com/mxstbr",
        avatar: "https://avatars0.githubusercontent.com/u/7525670?s=200&v=4",
    },
    {
        name: "Nik Graf",
        link: "https://twitter.com/nikgraf",
        avatar: "https://avatars0.githubusercontent.com/u/223045?v=3&s=400",
    },
    {
        name: "Pascal Brandt",
        link: "https://twitter.com/psbrandt",
        avatar:
            "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
    },
];

function ChatInput() {
    const ref = useRef(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState(mentions);

    const { MentionSuggestions, EmojiSuggestions, plugins } = useMemo(() => {
        const mentionPlugin = createMentionPlugin();
        //mentionPlugin
        const { MentionSuggestions } = mentionPlugin;
        //emojiPlugin
        const emojiPlugin = createEmojiPlugin();
        const { EmojiSuggestions } = emojiPlugin;

        const plugins = [mentionPlugin, emojiPlugin];
        return { plugins, MentionSuggestions, EmojiSuggestions };
    }, []);

    useEffect(() => {
        const content = editorState.getCurrentContent();
        console.log(content.getPlainText());
    }, [editorState]);

    const onSearchChange = useCallback(({ value }) => {
        setSuggestions(defaultSuggestionsFilter(value, mentions));
    }, []);
    const onOpenChange = useCallback((open) => {
        setOpen(open);
    }, []);

    const onEmojiSelect = (emojiObject) => {
        const state = insertCharacter(emojiObject.native, editorState);
        setEditorState(state);
    };

    return (
        <div>
            <div
                className="border-2 border-gray-400 w-80 mx-auto"
                onClick={() => ref.current.focus()}
            >
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    plugins={plugins}
                    ref={ref}
                />
                <MentionSuggestions
                    open={open}
                    onOpenChange={onOpenChange}
                    suggestions={suggestions}
                    onSearchChange={onSearchChange}
                    onAddMention={(mentions) => {
                        console.log(
                            "🚀 ~ file: index.js ~ line 82 ~ ChatInput ~ mention",
                            mentions
                        );
                    }}
                />
                <EmojiSuggestions />
            </div>
            <Picker
                set="twitter"
                onSelect={onEmojiSelect}
                include={["people"]}
            />
        </div>
    );
}
export default ChatInput;
