import { Extension } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { sql } from "@codemirror/lang-sql";
import { java } from "@codemirror/lang-java";
import { yaml } from "@codemirror/lang-yaml";

import { go } from "@codemirror/lang-go";
import { StreamLanguage } from "@codemirror/language";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { scala } from "@codemirror/legacy-modes/mode/clike";

export const getLanguageExtension = (filename: string): Extension => {
    const ext = filename.split(".").pop()?.toLowerCase();

    switch(ext) {
        // Modern Core Languages
        case "js":
        case "mjs":
        case "cjs":
            return javascript();
        case "jsx":
            return javascript({ jsx: true });
        case "ts":
            return javascript({ typescript: true });
        case "tsx":
            return javascript({ typescript: true, jsx: true });
        case "py":
            return python();
        case "go":
            return go();
        case "rs":
            return rust();

        // Web & Data
        case "html":
            return html();
        case "css":
            return css();
        case "json":
            return json();
        case "yaml":
        case "yml":
            return yaml();
        case "sql":
            return sql();
        case "md":
        case "mdx":
            return markdown();

        // Legacy/Stream Modes (Wrapped for CM6)
        case "rb":
            return StreamLanguage.define(ruby);
        case "scala":
            return StreamLanguage.define(scala);

        // System Backend
        case "cpp":
        case "c":
            return cpp();
        case "java":
            return java();
        case "php":
            return php();

        default:
            return [];
    }
};