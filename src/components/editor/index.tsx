import React, { useCallback, useEffect } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-css";
import "prismjs/components/prism-go";
import "prismjs/components/prism-sass";
import "prismjs/themes/prism.min.css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import { Fira_Code } from "@next/font/google";
import debounce from "lodash/debounce";

const fireCode = Fira_Code({ subsets: ["latin"] });

const prismLanguages = [
  "typescript",
  "jsx",
  "bash",
  "json",
  "tsx",
  "graphql",
  "css",
  "sass",
  "go",
  "clike",
  "javascript",
];

export function CodeEditor({
  language,
  code,
  onLanguageChange,
  onCodeChange,
}: {
  language: string;
  code: string;
  onLanguageChange: (e: string) => void;
  onCodeChange: (e: string) => void;
}) {
  const [localCode, setLocalCode] = React.useState(``);

  const delayedOnCodeChange = useCallback(
    (c: string) => {
      const debounced = debounce((dc: string) => onCodeChange(dc), 333);
      debounced(c);
    },
    [onCodeChange]
  );

  useEffect(() => {
    setLocalCode(code);
  }, [code]);

  useEffect(() => {
    delayedOnCodeChange(localCode);
  }, [localCode, delayedOnCodeChange]);

  return (
    <div className="body-wrapper">
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        {prismLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <div className={fireCode.className + " editor-wrapper"}>
        <Editor
          value={localCode}
          onValueChange={(code) => setLocalCode(code)}
          //   @ts-ignore
          highlight={(code) => Prism.highlight(code, Prism.languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </div>
    </div>
  );
}
