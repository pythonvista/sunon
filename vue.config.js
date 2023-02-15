const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "SUNON",
    themeColor: "#36454F",
    msTileColor: "#00FF00",
    iconPaths: {
      faviconSVG: "img/icons/favicon.svg",
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon-152x152.png",
      maskIcon: "img/icons/logo.png",
      msTileImage: "img/icons/logo.png",
    },
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    // configure the workbox plugin
  },
});
