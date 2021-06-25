const path = require("path");

module.exports = {
  webpack: {
    alias: {
      pages: path.resolve(__dirname, "src/pages/"),
      components: path.resolve(__dirname, "src/components/"),
      contexts: path.resolve(__dirname, "src/contexts/"),
      services: path.resolve(__dirname, "src/services/"),
      hooks: path.resolve(__dirname, "src/hooks/"),
      states: path.resolve(__dirname, "src/states/"),
      styles: path.resolve(__dirname, "src/styles/"),
      assets: path.resolve(__dirname, "src/assets/"),
    },
  },
};
