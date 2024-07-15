/**
 webpack 加载webpack.config.js中所有配置，此时就会new TestPlugin(),执行插件的constructor
 webpack 创建compiler对象
 遍历所有 plugins 的插件，调用插件的apply
 执行剩下编译流程（触发各个 hooks 事件）
 */
class TestPlugin {
  constructor() {
    console.log("Test plugin constructor");
  }

  apply(compiler) {
    console.log("Test plugin apply");
  }
}

module.exports = TestPlugin;
