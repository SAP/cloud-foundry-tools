module.exports = {
  runtimeCompiler: true,
  transpileDependencies: [],
  productionSourceMap: false,
  configureWebpack: {
    devtool: "source-map",
  },
  css: {
    loaderOptions: {
      postcss: {
        "postcss-preset-env": {},
      },
    },
  },
  pages: {
    app: {
      // entry for the page
      entry: "src/main.js",
      // the source template
      template: "public/index.html",
      // output as dist/index.html
      filename: `index.html`,
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "app"],
    },
  },
};
