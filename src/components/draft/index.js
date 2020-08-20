import React from "react";
import { EditorState, RichUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import InlineStyleControls from "./editControl/index";
import { decorationSignAt, decorationHashTag } from "./plugins/tweet";
import "./editorStyles.css";

class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.plugins = [];
  }

  onChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  focus = () => {
    this.editor.focus();
  };

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  // onBoldClick = () => {
  //   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  // };

  _toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };
  render() {
    return (
      <div className="RichEditor-root">
        <InlineStyleControls
          editorState={this.state.editorState}
          onToggle={this._toggleInlineStyle}
        />
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          plugins={this.plugins}
          onChange={this.onChange}
          decorators={[decorationSignAt, decorationHashTag]}
          ref={(element) => {
            this.editor = element;
          }}
        />
      </div>
    );
  }
}

export default DraftEditor;
