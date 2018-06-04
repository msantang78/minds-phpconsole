class ExecuteService {

  formEncode(obj) {
    const str = [];
    for(var p in obj)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
  }

  run(code) {
    return fetch('/api/execute', {
      method: 'post',
      headers: { "Content-type": "application/x-www-form-urlencoded"},
        body: this.formEncode({code})
    }).then(result => result.json());
  }
}

export default new ExecuteService();