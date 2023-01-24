import { useCaisyField } from "@caisy/ui-extension-react";
import { CodeEditor } from "../editor";

export function CodeExtension() {
  const { value, setValue } = useCaisyField();

  const language = value?.language || "typescript";
  const code = value?.language || "";

  const onLanguageChange = (lang: string) => {
    setValue({
      ...value,
      language: lang,
    });
  };
  const onCodeChange = (c: string) => {
    setValue({
      ...value,
      code: c,
    });
  };

  return (
    <>
      <CodeEditor language={language} onLanguageChange={onLanguageChange} code={code} onCodeChange={onCodeChange}/>
    </>
  );
}
