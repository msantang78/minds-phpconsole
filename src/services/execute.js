
/**
 * Execute Service
 */
class ExecuteService {

  /**
   * Form encode
   * @param {object} obj
   */
  formEncode(obj) {
    const str = [];
    for(var p in obj)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
  }

  /**
   * Run
   */
  run(code, type, subtype, params) {
    params = JSON.stringify(params);
    return fetch('/api/execute', {
      method: 'post',
      headers: { "Content-type": "application/x-www-form-urlencoded"},
        body: this.formEncode({code, type, subtype, params})
    }).then(result => result.json());
  }

  /**
   * Lint code
   * @param {string} code
   */
  lint(code) {
    return fetch('/api/lint', {
      method: 'post',
      headers: { "Content-type": "application/x-www-form-urlencoded"},
      body: this.formEncode({code})
    }).then(result => result.json()).catch(e => ({ pass: null, output: [ `(internal) ${e.message}` ] }));
  }
}

export default new ExecuteService();
