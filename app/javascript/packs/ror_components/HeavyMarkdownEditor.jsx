import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import * as style from './HeavyMarkdownEditor.module.css';

const HeavyMarkdownEditor = (props) => {
  const [value, setValue] = useState(props.initialContent || '# Hello World\n\nEdit me!');

  return (
    <div className={style.editorContainer}>
      <div className={style.info}>
        <h3>Bundle Splitting Demo</h3>
        <p>
          This component uses <code>@uiw/react-md-editor</code> - a heavy library (~300KB) that includes:
        </p>
        <ul>
          <li>Full markdown parser and renderer</li>
          <li>Syntax highlighting for code blocks</li>
          <li>Live preview functionality</li>
          <li>Multiple editor themes and plugins</li>
        </ul>
        <p>
          Thanks to React on Rails auto-registration, this heavy component is automatically 
          code-split into its own bundle, keeping the HelloWorld component lightweight!
        </p>
      </div>
      
      <div className={style.editor}>
        <MDEditor
          value={value}
          onChange={(val) => setValue(val || '')}
          preview="edit"
          height={400}
          hideToolbar={false}
          visibleDragBar={false}
        />
      </div>
      
      <div className={style.preview}>
        <h4>Live Preview:</h4>
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

HeavyMarkdownEditor.propTypes = {
  initialContent: PropTypes.string
};

export default HeavyMarkdownEditor;