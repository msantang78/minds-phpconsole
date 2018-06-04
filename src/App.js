import React, { Component } from 'react';
import './App.css';
import './css/tailwind.css';
import execute from './services/execute';

import Editor from './editor/Editor';

class App extends Component {

  state = {
    code: '',
    persistedCode: '',
    result: null
  }

  persistTimer$ = null;

  componentWillMount() {
    this.load();
  }

  onCodeChange = (code) => {
    this.setState({ code });

    if (this.persistTimer$) {
      clearTimeout(this.persistTimer$);
    }

    this.persistTimer$ = setTimeout(() => {
      this.save();
    }, 1000);
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
      this.setState({ persistedCode: atob(window.localStorage.getItem('persistedCode') || '') })
    } catch (e) {
      console.error(e);
    }
  }

  save() {
    window.localStorage.setItem('persistedCode', btoa(this.state.code));
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
            <div>
              <button onClick={this.onExecute} class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">Execute</button>
            </div>
          </div>
        </nav>

        <div className="">
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
