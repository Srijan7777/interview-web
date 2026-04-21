"use client";

import { useCallback } from "react";
import Editor from "@monaco-editor/react";

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
}

export default function MonacoEditor({
  value,
  onChange,
  language = "javascript",
  height = "100%",
  readOnly = false,
}: MonacoEditorProps) {
  const handleChange = useCallback(
    (newValue: string | undefined) => {
      if (newValue !== undefined) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  return (
    <Editor
      height={height}
      defaultLanguage={language}
      language={language}
      value={value}
      onChange={handleChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        fontFamily: "JetBrains Mono",
        padding: { top: 16, bottom: 16 },
        scrollBeyondLastLine: false,
        readOnly: readOnly,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: "on",
      }}
    />
  );
}
