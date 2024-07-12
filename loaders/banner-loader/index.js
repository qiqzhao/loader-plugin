const schema = require("./schema.json");

module.exports = function (content) {
  const options = this.getOptions(schema);
  const prefix = `
    /*
    * Authour: ${options.author}
    */
  `;
  return prefix + content;
};
