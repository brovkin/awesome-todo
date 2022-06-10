const path = require('path');

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      '@app': resolvePath('./src/app'),
      '@assets': resolvePath('./src/assets'),
      '@components': resolvePath('./src/components'),
      '@features': resolvePath('./src/features'),
      '@utils': resolvePath('./src/utils'),
    },
  },
};
