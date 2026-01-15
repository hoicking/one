// eslint-config-next v16 直接导出的是一个配置数组（CommonJS）
// 这里用 require 直接拿到数组即可，不需要 .default
const next = require('eslint-config-next');

module.exports = [
  ...next,
  {
    rules: {
      // 自定义规则
      "no-console": "warn",
    },
  },
];