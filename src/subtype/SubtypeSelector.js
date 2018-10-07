import React, { PureComponent } from 'react';

/**
 * Subtype Selector
 */
class SubtypeSelector extends PureComponent {
  /**
   * Render
   */
  render() {
    const subtype = this.props.subtype;
    const selected = 'flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3 bg-indigo';
    const unselected = 'cursor-pointer flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3 bg-indigo-dark text-grey-dark';
    return (
      <div className="flex flex-row">
        <span className={subtype === 'sql' ? selected : unselected} onClick={() => this.props.selected('sql')}>SQL</span>
        <span className={subtype === 'cql' ? selected : unselected} onClick={() => this.props.selected('cql')}>CQL</span>
      </div>
    );
  }
}

export default SubtypeSelector;
