module.exports = {
  apps: [
    {
      name: 'api',
      script: 'src/bin/www',
      instances: 'max',
      exec_mode: 'cluster',
      ignore_watch: ['[/\\]./', 'node_modules'],
      max_memory_restart: '300M',
      exp_backoff_restart_delay: 100,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
      },
      watch: true,
    },
  ],
}
