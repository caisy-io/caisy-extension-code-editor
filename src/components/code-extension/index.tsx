import { useCaisyField } from "@caisy/ui-extension-react";
import { CodeEditor } from "../editor";
import debounce from "lodash/debounce";
import { useCallback } from "react";

export function CodeExtension() {
  const { value, setValue, loaded } = useCaisyField();

  console.log(` value`, value);
  const language = value?.language || "typescript";
  const code = value?.language || "";


  const onLanguageChange = (lang: string) => {
    setValue({
      ...value,
      language: lang,
    });
  };
  const delayedSetState = useCallback(
    (v: any) => {
      const debounced = debounce((v: any) => setValue(v), 333);
      debounced(v);
    },
    [setValue]
  );

  const onCodeChange = (c: string) => {
    delayedSetState({
      ...value,
      code: c,
    });
  };


  
  if(!loaded) return null;

  return (
    <>
      <CodeEditor language={language} onLanguageChange={onLanguageChange} code={code} onCodeChange={onCodeChange}/>
    </>
  );
}
