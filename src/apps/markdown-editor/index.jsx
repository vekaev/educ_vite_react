import React, { useState } from "react";
import marked from "marked";

import "./index.css";

export function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("# Hello \n>  World");

  const handleChange = (e) => setMarkdown(e.target.value);

  return (
    <div className="markdown-editor">
      <textarea value={markdown} onChange={handleChange} />

      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      />
    </div>
  );
}
