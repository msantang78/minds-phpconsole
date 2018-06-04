import React, { PureComponent } from 'react';

import AceEditor from 'react-ace';

import 'brace/mode/php';
import 'brace/theme/dracula';

/**
 * Code Editor Component
 */
class Editor extends PureComponent {

  onChange = (code) => {
    if (this.props.onChange) this.props.onChange(code);
  }

  componentDidMount() {
    this.refs.aceEditor.editor.getSession().setMode({path:"ace/mode/php", inline:true});
  }

  render() {
    return (
      <AceEditor
        ref="aceEditor"
        mode="php"
        theme="dracula"
        defaultValue=""
        width="100%"
        showPrintMargin={false}
        onChange={this.onChange}
        name="code_editor"
        editorProps={{$blockScrolling: true}}
      />
    );
  }
}

export default Editor;
