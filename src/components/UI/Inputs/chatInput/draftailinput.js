import { useCallback, useMemo, useState } from "react";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";
import {
    DraftailEditor,
    BLOCK_TYPE,
    INLINE_STYLE,
    ENTITY_TYPE,
} from "draftail";

//?draft js plugins
import createMentionPlugin, {
    defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createPrismPlugin from "draft-js-prism-plugin";
//?draft js css
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/emoji/lib/plugin.css";
import "draft-js/dist/Draft.css";
import classes from "../chatInput/draftStyle.module.css";

//?draft js

//?emojis picker
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
//?Prism
import Prism from "prismjs";

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

function DrafTailInput() {
    const [suggestions, setSuggestions] = useState(mentions);
    const [open, setOpen] = useState(false);

    console.log(ENTITY_TYPE);

    const { MentionSuggestions, EmojiSuggestions, plugins } = useMemo(() => {
        const mentionPlugin = createMentionPlugin();
        //mentionPlugin
        const { MentionSuggestions } = mentionPlugin;
        //emojiPlugin
        const emojiPlugin = createEmojiPlugin();
        const { EmojiSuggestions } = emojiPlugin;
        //hashTag
        const hashtagPlugin = createHashtagPlugin({ theme: classes });
        //links highlight
        const linkifyPlugin = createLinkifyPlugin({
            theme: { link: classes.link },
        });
        //prism hightlight
        const prismPlugin = createPrismPlugin({
            // It's required to provide your own instance of Prism
            prism: Prism,
        });

        const plugins = [
            mentionPlugin,
            emojiPlugin,
            hashtagPlugin,
            linkifyPlugin,
            prismPlugin,
        ];
        return { plugins, MentionSuggestions, EmojiSuggestions };
    }, []);

    const onSave = (content) => {
        console.log("saving", content);
        sessionStorage.setItem("draftail:content", JSON.stringify(content));
    };

    const onSearchChange = useCallback(({ value }) => {
        setSuggestions(defaultSuggestionsFilter(value, mentions));
    }, []);
    const onOpenChange = useCallback((open) => {
        setOpen(open);
    }, []);

    // const onEmojiSelect = (emojiObject) => {
    //     const state = insertCharacter(emojiObject.native, editorState);
    //     setEditorState(state);
    // };
    return (
        <div>
            <div>
                <DraftailEditor
                    onSave={onSave}
                    plugins={plugins}
                    inlineStyles={[
                        {
                            label: "B",
                            type: INLINE_STYLE.BOLD,
                            style: {
                                fontWeight: "bolder",
                            },
                        },
                        { type: INLINE_STYLE.ITALIC },
                        { type: INLINE_STYLE.CODE },
                        { type: INLINE_STYLE.KEYBOARD },
                        { type: INLINE_STYLE.UNDERLINE },
                        { type: INLINE_STYLE.STRIKETHROUGH },
                        { type: INLINE_STYLE.QUOTATION },
                    ]}
                    blockTypes={[
                        { type: BLOCK_TYPE.CODE, style: { background: "red" } },
                        { type: BLOCK_TYPE.HEADER_ONE },
                        { type: BLOCK_TYPE.HEADER_TWO },
                        { type: BLOCK_TYPE.HEADER_THREE },
                        { type: BLOCK_TYPE.HEADER_FOUR },
                        { type: BLOCK_TYPE.HEADER_FIVE },
                        { type: BLOCK_TYPE.HEADER_SIX },
                        { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
                        { type: BLOCK_TYPE.ORDERED_LIST_ITEM },
                        { type: BLOCK_TYPE.BLOCKQUOTE },
                    ]}
                    enableHorizontalRule
                    showUndoControl
                    showRedoControl
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
                // onSelect={onEmojiSelect}
                include={["people"]}
            />
        </div>
    );
}

export default DrafTailInput;
