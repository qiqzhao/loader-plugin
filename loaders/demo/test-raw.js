// module.exports = function (content) {
//   return content;
// };

// module.exports.raw = true;

function testRawLoader(content) {
  return content;
}

testRawLoader.raw = true;

module.exports = testRawLoader;
