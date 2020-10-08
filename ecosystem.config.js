module.exports = {
  apps: [
    {
      name: 'api',
      script: 'src/bin/www',
      ignore_watch: ['[/\\]./', 'node_modules'],
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
