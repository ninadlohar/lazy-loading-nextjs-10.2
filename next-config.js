

module.exports = {
      webpack5: true,
      webpack: (config, { isServer }) => {
        // if (!isServer) {
        //   config.resolve.fallback.fs = false;
        // }
        if (isServer) {
          require("./scripts/generate-sitemap");
        }
        return config;
      },
    };
