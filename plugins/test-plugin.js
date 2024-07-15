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

    // environment是同步钩子，需要tap注册
    compiler.hooks.environment.tap("TestPlugin", () => {
      console.log("Test plugin environment");
    });

    // emit 是异步串行钩子
    compiler.hooks.emit.tap("TestPlugin", (compilation) => {
      console.log("Test plugin emit");
    });

    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("Test plugin emit async");
        callback();
      }, 2000);
    });

    compiler.hooks.emit.tapPromise("TestPlugin", (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Test plugin emit async");
          resolve();
        }, 1000);
      });
    });

    // make 是异步并行钩子 AsyncParalleHook
    compiler.hooks.make.tapAsync(
      "TestPlugin",
      (compilation, callback) => {
        setTimeout(() => {
          console.log("Test plugin make 111");
          callback();
        });
      },
      3000
    );

    compiler.hooks.make.tapAsync(
      "TestPlugin",
      (compilation, callback) => {
        setTimeout(() => {
          console.log("Test plugin make 222");
          callback();
        });
      },
      1000
    );

    compiler.hooks.make.tapAsync(
      "TestPlugin",
      (compilation, callback) => {
        setTimeout(() => {
          console.log("Test plugin make 333");
          callback();
        });
      },
      2000
    );
  }
}

module.exports = TestPlugin;
