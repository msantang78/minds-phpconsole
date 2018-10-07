import React, { Component } from 'react';
import './App.css';
import './css/tailwind.css';
import execute from './services/execute';
import storage from './services/storage';

import Editor from './editor/Editor';
import Result from './result/Result';
import CodeError from './errors/CodeError';
import Header from './header/Header';
import SubtypeSelector from './subtype/SubtypeSelector';

/**
 * App
 */
class App extends Component {

  state = {
    tabs: [],
    currentTab: 0,
    running: false,
    lint: {
      pass: null,
      output: []
    },
  }

  persistTimer$ = null;

  /**
   * Component will mount
   */
  componentWillMount() {
    this.load();
  }

  /**
   * Current tab getter
   */
  get currentTab() {
    return this.state.tabs[this.state.currentTab];
  }

  /**
   * On code change
   */
  onCodeChange = (code) => {
    const tabs = [...this.state.tabs];
    tabs[this.state.currentTab].code = code;

    this.setState({ tabs, lint: { pass: null, output: [] } });

    if (this.persistTimer$) {
      clearTimeout(this.persistTimer$);
    }

    this.persistTimer$ = setTimeout(() => {
      this.save();
      this.lint();
    }, 1000);
  }

  /**
   * Change tab
   */
  changeTab = (currentTab) => {
    // first save, then change tab
    this.save();
    this.setState({currentTab}, () => {
      this.editor.change(this.state.tabs[currentTab].code, this.state.tabs[currentTab].type);
    });
  }

  /**
   * On press execute
   */
  onExecute = async () => {
    this.save();
    console.log('Execute');
    this.setState({running: true});
    let result;
    const params = {};

    const currentTab = this.currentTab;

    if (currentTab.type === 'ace/mode/php') {
      const sqls = this.state.tabs.filter(t => t.type === 'ace/mode/sql' && t.code.trim());
      sqls.forEach(s => params[s.name] = s.code);
    }

    try {
      result = await execute.run(currentTab.code, currentTab.type, currentTab.subtype, params);
    } catch(e) {
      console.log(e);
    }
    currentTab.result = result;
    this.setState({running: false});
  }

  /**
   * On component will unmount
   */
  componentWillUnmount() {
    if (this.persistTimer$) {
      clearTimeout(this.persistTimer$);
    }

    this.save();
  }

  /**
   * Load stored code
   */
  load() {
    const tabs = storage.getTabs();
    this.setState({ tabs });
    this.lint();
  }

  /**
   * Persist code
   */
  save() {
    const tab = this.currentTab;
    storage.storeTab(tab.name, tab.code, tab.type, tab.subtype);
  }

  /**
   * Lint current tab
   */
  async lint() {
    if (!this.currentTab || this.currentTab.type === 'ace/mode/sql') return;
    const lint = await execute.lint(this.currentTab.code);
    this.setState({ lint });
  }

  /**
   * on New tab
   */
  newTab = (type) => {
    const tabs = [...this.state.tabs];
    const subtype = type === 'sql' ? 'sql' : '';
    const tab = storage.newTab(type.toUpperCase()+tabs.length, '', `ace/mode/${type}`, subtype);
    tabs.push(tab);
    this.setState({tabs});
  }

  /**
   * Change tab subtype
   */
  changeTabSubtype = (subtype) => {
    this.currentTab.subtype = subtype;
    const tabs = [...this.state.tabs]
    this.setState({tabs});
  }

  /**
   * delete Tab
   */
  deleteTab = () => {
    if (this.state.currentTab === 0) return;
    const name = this.currentTab.name;

    storage.deleteTab(name);
    const tabs = [...this.state.tabs];
    tabs.splice(this.state.currentTab, 1);
    this.setState({tabs, currentTab: this.state.currentTab - 1}, () => this.changeTab(this.state.currentTab));
  }

  /**
   * Render
   */
  render() {
    const code = this.state.tabs[this.state.currentTab].persistedCode ;
    const isSql = this.currentTab.type === 'ace/mode/sql';
    return (
      <div>
        <Header
          lint={this.state.lint}
          onExecute={this.onExecute}
          running={this.state.running}
          tabs={this.state.tabs}
          currentTab={this.state.currentTab}
          onTabSelected={this.changeTab}
          onNewTab={this.newTab}
        />

        {this.currentTab.result && this.currentTab.result.error && <CodeError result={this.currentTab.result}/>}

        <div className={this.state.tabs.length ? 'relative pt-2 bg-blue-darkest ' : 'relative spinner'}>
          {this.state.tabs.length && <Editor
            ref={r => this.editor = r}
            onChange={this.onCodeChange}
            defaultValue={ code }
          />}
          <div className="float-right flex flex-row items-center pin-t pin-r absolute z-10 p-1 p-2 bg-indigo-darker text-indigo-lightest leading-none rounded-bl-lg lg:inline-flex">
            {isSql && <SubtypeSelector subtype={this.currentTab.subtype} selected={this.changeTabSubtype} />}
            <svg onClick={this.deleteTab} className="fill-current w-4 h-4 mr-2 text-white" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </div>
        </div>

        {this.currentTab.result && <Result result={this.currentTab.result} tab={this.currentTab} />}
      </div>
    );
  }
}

export default App;
