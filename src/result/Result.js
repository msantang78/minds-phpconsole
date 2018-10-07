import React, { PureComponent } from 'react';

const TableRow = ({row}) => (
  <tr className="hover:bg-indigo">
    {Object.keys(row).map(key => <td key={key} className="text-indigo-lightest">{row[key]}</td>)}
  </tr>
)

const TableRowTitle = ({row}) => (
  <tr className="bg-indigo-dark ">
    {Object.keys(row).map(key => <th className="text-sm py-1" key={key}>{key}</th>)}
  </tr>
)

const Table = ({data}) => (
  <table className="table-auto w-full bg-indigo-darker">
    <TableRowTitle row={data[0]}/>
    {data.map(row => <TableRow row={row}/>)}
  </table>
)


/**
 *  Execution Result Component
 */
class Result extends PureComponent {

  componentDidMount() {

  }

  render() {
    const result = this.props.result;
    let output = null;

    if (result.output) {
      output = this.props.tab.type === 'ace/mode/php' ?
        <pre>{result.output}</pre> :
        <Table data={result.output}/>
    }

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
          {output}
        </div>
      </div>
    );
  }
}

export default Result;