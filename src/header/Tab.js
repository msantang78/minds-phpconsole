import React, { PureComponent } from 'react';

/**
 *  Tab
 */
class Tab extends PureComponent {

  onExecute = () => {
    this.props.onExecute();
  }

  onSelected = () => {
    this.props.onSelected(this.props.index)
  }

  render() {
    let tabClass;

    if (this.props.type === 'ace/mode/php') {
      tabClass = this.props.selected ?
        "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-dark font-normal":
        "bg-grey-lightest inline-block py-2 px-4 text-blue hover:text-blue-darker font-thin";
    } else {
      tabClass = this.props.selected ?
        "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-green-dark font-normal":
        "bg-grey-lightest inline-block py-2 px-4 text-green hover:text-green-darker font-thin";
    }

    return (
      <li className="mr-1 cursor-pointer" onClick={this.onSelected}>
        <a className={tabClass} >{this.props.name}</a>
      </li>
    );
  }
}

export default Tab;