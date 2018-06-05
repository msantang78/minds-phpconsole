import React, { Component } from 'react';
import './App.css';
import './css/tailwind.css';
import execute from './services/execute';

import Editor from './editor/Editor';

class App extends Component {

  state = {
    code: '',
    persistedCode: '',
    result: null,
    lint: {
      pass: null,
      output: []
    },
  }

  persistTimer$ = null;

  componentWillMount() {
    this.load();
  }

  onCodeChange = (code) => {
    this.setState({ code, lint: { pass: null, output: [] } });

    if (this.persistTimer$) {
      clearTimeout(this.persistTimer$);
    }

    this.persistTimer$ = setTimeout(() => {
      this.save();
      this.lint();
    }, 350);
  }

  onExecute = async () => {
    this.save();
    console.log('Execute');
    const result = await execute.run(this.state.code);
    this.setState({result});
    console.log(result);
  }

  componentWillUnmount() {
    if (this.persistTimer$) {
      clearTimeout(this.persistTimer$);
    }

    this.save();
  }

  load() {
    try {
      this.setState({ persistedCode: atob(window.localStorage.getItem('persistedCode') || '') });
      this.lint();
    } catch (e) {
      console.error(e);
    }
  }

  save() {
    window.localStorage.setItem('persistedCode', btoa(this.state.code));
  }

  async lint() {
    const lint = await execute.lint(this.state.code);
    this.setState({ lint });
  }

  render() {
    return (
      <div>
        <nav class="flex items-center justify-between flex-wrap bg-indigo-light p-2">
          <div class="flex items-center flex-no-shrink text-white mr-6">
            <img class="fill-current h-12 w-12 mr-2" src="/Minds_logo.svg"/>
            <span class="font-semibold text-xl tracking-tight">Minds PHP Console</span>
          </div>
          <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
              <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div>
          <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
            </div>
            { this.state.lint.output.length > 0 &&
              <div className="m-2 font-sans text-xs text-white">
                {this.state.lint.output[0]}
              </div>
            }
            <div class="m-2">
              <div
                className={[
                  "border border-white rounded-full h-3 w-3 flex items-center justify-center",
                  this.state.lint.pass === true && 'bg-green' : '',
                  this.state.lint.pass === false && 'bg-red' : '',
                ].join(' ')}
                title={this.state.lint.output.join('\n')}
              ></div>
            </div>
            <div>
              <button
                onClick={this.onExecute}
                disabled={this.state.lint.pass === false}
                className={[
                  "inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white mt-4 lg:mt-0",
                  this.state.lint.pass !== false ? 'hover:border-transparent hover:text-teal hover:bg-white' : '',
                  this.state.lint.pass === false ? 'opacity-50 cursor-not-allowed' : '',
                ].join(' ')}
              >Execute</button>
            </div>
          </div>
        </nav>

        {this.state.result && this.state.result.error &&  <div class="bg-red-lightest border-l-4 border-red-light text-red-darkest px-4 py-3 m-4 shadow-md">
          <div class="flex">
            <div class="py-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current h-6 w-6 text-red-light mr-4">
                <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm-.5-5h1c.276 0 .5.224.5.5v1c0 .276-.224.5-.5.5h-1c-.276 0-.5-.224-.5-.5v-1c0-.276.224-.5.5-.5zm0-8h1c.276 0 .5.224.5.5V8l-.5 3-1 .5L9 8V5.5c0-.276.224-.5.5-.5z"></path>
              </svg>
            </div>
            <div>
              <p class="font-semibold">Error!</p>
              <p class="text-sm"><span class="text-red-light">{this.state.result.error}</span><br/>File: <span class="text-red-light">{this.state.result.file}</span> <br/>Line: <span class="text-red-light">{this.state.result.line}</span></p>
            </div>
          </div>
        </div>}

        <div className="pt-2 bg-blue-darkest">
          <Editor
            onChange={this.onCodeChange}
            defaultValue={this.state.persistedCode}
          />
        </div>

        {this.state.result && <div className="m-2 p-2 bg-blue-darker shadow-lg text-grey-lightest text-xs font-mono">
          <div class="flex border-grey">
            <div class="flex-1 text-center px-4 py-1">
              <span class="text-grey">Memory:</span> {this.state.result.memory}
            </div>
            <div class="flex-1 text-center px-4 py-1">
            <span class="text-grey">Memory Peak:</span> {this.state.result.memory_peak}
            </div>
            <div class="flex-1 text-center px-4 py-1">
            <span class="text-grey">Time:</span> <strong>{this.state.result.time} ms</strong>
            </div>
          </div>
          <div>
            OUTPUT:
            <pre>{this.state.result.output}</pre>
          </div>
        </div>}
      </div>
    );
  }
}

export default App;
