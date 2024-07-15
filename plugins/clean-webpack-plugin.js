class CleanWebpackPlugin {
  apply(compiler) {
    // 2. 获取打包输出目录
    const outputPath = compiler.options.output.path;
    const fs = compiler.outputFileSystem;

    // 1. 注册钩子，打包输出之前 emit
    compiler.hooks.emit.tap("CleanWebpackPlugin", (compilation) => {
      // 3. 通过fs 删除打包输出目录下的所有文件
      this.removeFiles(fs, outputPath);
    });
  }

  removeFiles(fs, filepath) {
    //
    // 1. 读取当前目录下的所有资源
    const files = fs.readdirSync(filepath);
    // 2. 遍历删除
    // 2.1 判断所有文件，文件 or 文件夹
    files.forEach((file) => {
      const path = `${filepath}/${file}`;
      const fileStat = fs.statSync(path);
      if (fileStat.isDirectory()) {
        // 2.3 文件夹 先删除里面所有的文件
        this.removeFiles(fs, path);
      } else {
        // 2.2 文件 直接删除
        fs.unlinkSync(path);
      }
    });
  }
}

module.exports = CleanWebpackPlugin;
