"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Box } from "@mui/material";
import debounce from "lodash.debounce";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditorGroup = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState(value);

  useEffect(() => {
    setEditorContent(value);
  }, [value]);

  const editorConfig = useMemo(
    () => ({
      height: 400,
      style: {
        fontSize: "small",
      },
      toolbarAdaptive: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "fontsize",
        "paragraph",
        "brush",
        "link",
        "align",
        "undo",
        "redo",
      ],
    }),
    []
  );

  const debouncedOnChangeRef = useRef(
    debounce((newContent: string) => {
      onChange(newContent);
    }, 300)
  );

  useEffect(() => {
    debouncedOnChangeRef.current = debounce((newContent: string) => {
      onChange(newContent);
    }, 1000);
  }, [onChange]);

  const handleEditorChange = (newContent: string) => {
    setEditorContent(newContent);
    debouncedOnChangeRef.current(newContent);
  };

  return (
    <Box component="div" className="text-editor-group">
      <Box component="label" htmlFor={id} className="text-sm font-semibold">
        {label}
      </Box>

      <JoditEditor
        id={id}
        name={id}
        ref={editor}
        value={editorContent}
        onChange={handleEditorChange}
        config={editorConfig}
      />
    </Box>
  );
};

export default TextEditorGroup;
