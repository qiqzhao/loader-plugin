const babel = require("@babel/core");
const schema = require("./schema.json");

module.exports = function (content) {
  const callback = this.async();
  const options = this.getOptions(schema);

  babel.transform(content, options, function (err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.code);
    }
  });
  return content;
};
