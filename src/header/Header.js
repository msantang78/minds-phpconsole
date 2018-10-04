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

    const disabled = lint.pass === false || this.props.running;

    return (
      <nav className="flex items-center justify-between flex-wrap bg-grey-lightest p-2 shadow">
        <div className="flex items-center flex-no-shrink text-grey-dark mr-6">
          <img className="fill-current h-12 w-12 mr-2" src="/Minds_logo.svg"/>
          <span className="font-hairline text-xl tracking-wide">MINDS <span className="font-medium">PHP</span> CONSOLE</span>
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
              disabled={disabled}
              className={
                "inline-block text-sm px-4 py-2 leading-none border rounded text-blue border-blue mt-4 lg:mt-0"+
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