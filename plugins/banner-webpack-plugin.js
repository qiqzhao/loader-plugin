class BannerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    // emit 异步串行钩子
    compiler.hooks.emit.tapAsync(
      "BannerWebpackPlugin",
      (compilation, callback) => {
        // 需要处理文件
        const extensions = ["js", "css"];
        // 1. 获取即将输出的资源文件，compilation.assets
        // 2. 过去只获取js css资源
        const assets = Object.keys(compilation.assets).filter((path) => {
          // 将文件名切割['xxx', 'js'] ['xxx', 'css']
          const splitted = path.split(".");
          // 获取最后一个文件扩展名
          const extension = splitted[splitted.length - 1];
          // 判断是否包含
          return extensions.includes(extension);
        });
        // 3. 遍历剩下资源添加上注释
        console.log(assets);
        assets.forEach((asset) => {
          const source = compilation.assets[asset].source();
          const prefix = `/**
* Authour: ${this.options.author}
 */
`;

          // 拼接注释
          const content = prefix + source;

          compilation.assets[asset] = {
            source() {
              return content;
            },
            size() {
              return content.length;
            },
          };
        });
        callback();
      }
    );
  }
}

module.exports = BannerWebpackPlugin;
