/**
 * Storage Service
 */
class StorageService {
  tabs = [];

  /**
   * Create a new tab
   * @param {string} name
   * @param {string} code
   * @param {string} type
   * @param {string} subtype
   */
  newTab(name, code, type, subtype) {
    this.tabs.push(name);
    window.localStorage.setItem('tabsnames', JSON.stringify(this.tabs));
    this.storeTab(name, code, type, subtype)
    return {name, code, type, result: null, subtype};
  }

  /**
   * Persist the tab
   * @param {string} name
   * @param {string} code
   * @param {string} type
   * @param {string} subtype
   */
  storeTab(name, code, type, subtype) {
    window.localStorage.setItem('tabs_'+name, JSON.stringify({code: btoa(code), type, subtype}));
  }

  /**
   * Delete tab from storage
   * @param {string} name
   */
  deleteTab(name) {
    window.localStorage.removeItem('tabs_'+name);
    const index = this.tabs.indexOf(name);
    if (index !== -1) {
      this.tabs.splice(index, 1);
      window.localStorage.setItem('tabsnames', JSON.stringify(this.tabs));
    }
  }

  /**
   * Get all tabs from the storage
   */
  getTabs() {
    const tabs = [];
    try {
      this.tabs = JSON.parse(window.localStorage.getItem('tabsnames'));
      this.tabs.forEach(t => {
        const tab = JSON.parse(window.localStorage.getItem('tabs_'+t));
        tab.code = atob(tab.code);
        tab.persistedCode = tab.code;
        tab.name = t;
        tab.result = null;
        tabs.push(tab);
      });
      console.log(tabs)
      return tabs;
    } catch(e) {
      this.tabs = [];
      this.newTab('PHP', '', 'ace/mode/php');
      return [{
        name: 'PHP',
        code: '',
        result: null,
        type: 'ace/mode/php'
      }];
    }
  }
}

export default new StorageService();
