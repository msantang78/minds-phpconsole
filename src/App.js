import React, { Component } from 'react';
import './App.css';
import './css/tailwind.css';
import execute from './services/execute';

import Editor from './editor/Editor';
import Result from './result/Result';
import CodeError from './errors/CodeError';
import Header from './header/Header';

class App extends Component {

  state = {
    code: '',
    persistedCode: '',
    running: false,
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
    this.setState({running: true});
    let result;
    try {
      result = await execute.run(this.state.code);
    } catch(e) {
      console.log(e);
    }
    this.setState({result, running: false});
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
        <Header lint={this.state.lint} onExecute={this.onExecute} running={this.state.running}/>

        {this.state.result && this.state.result.error && <CodeError result={this.state.result}/>}

        <div className="pt-2 bg-blue-darkest">
          <Editor
            onChange={this.onCodeChange}
            defaultValue={this.state.persistedCode}
          />
        </div>

        {this.state.result && <Result result={this.state.result} />}
      </div>
    );
  }
}

export default App;
