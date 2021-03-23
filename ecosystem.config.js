module.exports = {
  apps : [{
    name: 'onetest',
    script: 'server.js',
    error_file: 'onetest_err.log',
    out_file: 'onetest_out.log',
    watch: '.',
    increment_var: 'PORT',
    env: {
      "PORT":3000,
      "NODE_ENV": "development"
    },
    env_production: {
      "PORT":3000,
      "NODE_ENV": "production"
    },
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
