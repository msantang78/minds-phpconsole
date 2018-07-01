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
      <div className="m-2 p-2 bg-blue-darker shadow-lg text-grey-lightest text-xs font-mono">
        <div className="flex border-grey">
          <div className="flex-1 text-center px-4 py-1">
            <span className="text-grey">Memory:</span> {result.memory}
          </div>
          <div className="flex-1 text-center px-4 py-1">
          <span className="text-grey">Memory Peak:</span> {result.memory_peak}
          </div>
          <div className="flex-1 text-center px-4 py-1">
          <span className="text-grey">Time:</span> <strong>{result.time} ms</strong>
          </div>
        </div>
        <div>
          OUTPUT:
          <pre>{result.output}</pre>
        </div>
      </div>
    );
  }
}

export default Result;