import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

/**
 *  Header Component
 */
class Header extends PureComponent {

  onExecute = () => {
    this.props.onExecute();
  }

  render() {
    const lint = this.props.lint;
    const disabled = lint.pass === false || this.props.running;
    const tabs = this.props.tabs;
    const currentTab = this.props.tabs[this.props.currentTab];

    return (
      <nav className="flex items-center justify-between flex-wrap bg-grey-lightest shadow">
        <div className="flex items-center flex-no-shrink text-grey-dark mr-6 my-2">
          <img className="fill-current mx-2" src="/Minds_logo.svg" height="35"/>
          <span className="font-hairline text-xl tracking-wide">MINDS <span className="font-medium">PHP</span> CONSOLE</span>
        </div>
        <ul className="list-reset flex -mb-4">
          {
            tabs.map((t, i) => {
              return (<Tab name={t.name} type={t.type} key={i} index={i} selected={i === this.props.currentTab} onSelected={this.props.onTabSelected}/>)
            })
          }
        <li className="mr-1 cursor-pointer" onClick={() => this.props.onNewTab('sql')}>
          <a className="bg-grey-lightest inline-block py-2 px-2 text-green hover:text-green-darker font-semibold  border-l border-t border-r rounded-t" >+</a>
        </li>
        <li className="mr-1 cursor-pointer" onClick={() => this.props.onNewTab('php')}>
          <a className="bg-grey-lightest inline-block py-2 px-2 text-blue hover:text-blue-darker font-semibold  border-l border-t border-r rounded-t" >+</a>
        </li>
        </ul>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow"></div>
          { lint.output.length > 0 &&
            <div className="m-2 font-sans text-xs text-blue-light">
              {lint.output[0]}
            </div>
          }
          { currentTab.type === 'ace/mode/php' &&
            <div className="m-2">
              <div
                className={
                  "border border-white rounded-full h-3 w-3 flex items-center justify-center"+(lint.pass ? ' bg-green' : ' bg-red')
                }
                title={lint.output.join('\n')}
              ></div>
            </div>
          }
          <div>
            <button
              onClick={this.onExecute}
              disabled={disabled}
              className={
                "inline-block text-sm px-4 py-2 mr-2 leading-none border rounded text-blue border-blue mt-4 lg:mt-0"+
                (disabled ? ' opacity-50 cursor-not-allowed' : ' hover:border-transparent hover:text-white hover:bg-blue-light')+
                (this.props.running ? ' spinner' : '')
              }
            >Run</button>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  onExecute: PropTypes.func
};

export default Header;