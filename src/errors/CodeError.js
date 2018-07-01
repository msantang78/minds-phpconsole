import React, { PureComponent } from 'react';

/**
 *  Execution Result Component
 */
class Result extends PureComponent {

  componentDidMount() {

  }

  render() {
    const result = this.props.result;

    return (
      <div className="bg-red-lightest border-l-4 border-red-light text-red-darkest px-4 py-3 m-4 shadow-md">
        <div className="flex">
          <div className="py-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="fill-current h-6 w-6 text-red-light mr-4">
              <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm-.5-5h1c.276 0 .5.224.5.5v1c0 .276-.224.5-.5.5h-1c-.276 0-.5-.224-.5-.5v-1c0-.276.224-.5.5-.5zm0-8h1c.276 0 .5.224.5.5V8l-.5 3-1 .5L9 8V5.5c0-.276.224-.5.5-.5z"></path>
            </svg>
          </div>
          <div>
            <p className="font-semibold">Error!</p>
            <p className="text-md border-b-1 border-red"><span className="text-red-light">{result.error}</span><br/>File: <span className="text-red-light">{result.file}</span> <br/>Line: <span className="text-red-light">{result.line}</span></p>
            <pre className="text-xs">
              <code dangerouslySetInnerHTML={{__html:result.section}}></code>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default Result;