if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'development') {
  const config = require('./../config.json');
  const envConfig = config[process.env.NODE_ENV];
  
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
