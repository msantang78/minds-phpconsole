import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 *  Header Component
 */
class Header extends PureComponent {

  onExecute = () => {
    this.props.onExecute();
  }

  render() {
    const lint = this.props.lint;

    return (
      <nav className="flex items-center justify-between flex-wrap bg-indigo-light p-2">
        <div className="flex items-center flex-no-shrink text-white mr-6">
          <img className="fill-current h-12 w-12 mr-2" src="/Minds_logo.svg"/>
          <span className="font-semibold text-xl tracking-tight">Minds PHP Console</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow"></div>
          { lint.output.length > 0 &&
            <div className="m-2 font-sans text-xs text-white">
              {lint.output[0]}
            </div>
          }
          <div className="m-2">
            <div
              className={
                "border border-white rounded-full h-3 w-3 flex items-center justify-center"+(lint.pass ? ' bg-green' : ' bg-red')
              }
              title={lint.output.join('\n')}
            ></div>
          </div>
          <div>
            <button
              onClick={this.onExecute}
              disabled={lint.pass === false}
              className={
                "inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white mt-4 lg:mt-0"+
                (lint.pass ? ' hover:border-transparent hover:text-teal hover:bg-white' : ' opacity-50 cursor-not-allowed')
              }
            >Execute</button>
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