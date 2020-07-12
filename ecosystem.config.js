module.exports = {
  apps : [{
    name: 'mile-test-api',
    script: "index.js",
    instances: "max",
    "ignore_watch" : ["node_modules"],
    exec_mode: "cluster",
    env: {
      "NODE_ENV": "development"
    },
    env_production: {
      "NODE_ENV": "production"
    }
  }]
};
