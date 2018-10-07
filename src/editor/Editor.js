import React, { PureComponent } from 'react';

import AceEditor from 'react-ace';

import 'brace/mode/php';
import 'brace/mode/sql';
import 'brace/theme/dracula';

/**
 * Code Editor Component
 */
class Editor extends PureComponent {

  /**
   * On change
   */
  onChange = (code) => {
    if (this.props.onChange) this.props.onChange(code);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.change(this.props.defaultValue || '', "ace/mode/php");
  }

  /**
   * Change
   * @param {string} code
   * @param {string} type
   */
  change(code, type) {
    const session = this.refs.aceEditor.editor.getSession();
    session.setMode({path: type, inline:true});
    session.setValue(code || '');
  }

  /**
   * Render
   */
  render() {
    return (
      <AceEditor
        ref="aceEditor"
        mode="php"
        theme="dracula"
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
