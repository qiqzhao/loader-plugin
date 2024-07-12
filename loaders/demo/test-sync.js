// module.exports = function (content) {
//   return content;
// };

module.exports = function (content, map, meta) {
  console.log("test sync");
  this.callback(null, content, map, meta);
};
