module.exports = {
  apps: [
    {
      name: "[dev] HW Server",
      script: 'ts-node -r tsconfig-paths/register src/app.ts',
      env: {
        NODE_ENV: "dev",
        PORT: 15000,
      },
      watch: false
    },
  ]
};
