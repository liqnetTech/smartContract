const CONFIG_PATH_APP = '/app/config/config.js';
const CONFIG_PATH_CURRENT = __filename;

const defaultConfig = {
  // Имя контракта токена
  token_name: 'CDT',
};

if (CONFIG_PATH_APP === CONFIG_PATH_CURRENT) {
  // Приложение запущено в отдельном контейнере
  // как правило в режиме разработки или теста.
  module.exports = defaultConfig;
} else {
  // Приложение запущено в production режиме.
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const rootConfig = require(CONFIG_PATH_APP);

  module.exports = Object.assign({}, defaultConfig, rootConfig);
}
