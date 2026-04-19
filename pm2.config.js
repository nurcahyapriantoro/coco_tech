// PM2 Ecosystem Configuration
// Docs: https://pm2.keymetrics.io/docs/usage/application-declaration/
//
// Usage:
//   pm2 start pm2.config.js          # Start
//   pm2 reload pm2.config.js         # Zero-downtime reload
//   pm2 stop cocotech-backend        # Stop
//   pm2 delete cocotech-backend      # Remove from PM2
//   pm2 save                         # Save process list
//   pm2 startup                      # Auto-start on server reboot

export default {
  apps: [
    {
      name: 'cocotech-backend',
      script: 'src/server.js',

      // Run from backend/ directory so --env-file=.env resolves correctly
      cwd: './backend',

      // --env-file loads .env BEFORE any module is evaluated (critical for ESM)
      node_args: '--env-file=.env',

      // Instances: 1 for single-core Droplet, set to 'max' for multi-core
      instances: 1,

      // Restart strategy
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',

      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 10000,

      // Environment
      env_production: {
        NODE_ENV: 'production',
      },

      // Logging
      out_file: '../logs/pm2-out.log',
      error_file: '../logs/pm2-error.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

      // Crash recovery
      min_uptime: '10s',
      max_restarts: 10,
    },
  ],
};
