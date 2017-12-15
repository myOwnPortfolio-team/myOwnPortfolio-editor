class Module {
  constructor(name, sha = null, content = null, properties = null, style = null) {
    this.name = name;
    this.sha = sha;
    this.schema = {
      content,
      properties,
      style,
    };
  }
}

module.exports = Module;
