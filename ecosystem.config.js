module.exports = {
  apps: [
    {
      name: "[dev] Planning Server Reworked",
      script: 'ts-node -r tsconfig-paths/register src/app.ts',
      env: {
        NODE_ENV: "dev",
        PORT: 28721,
      },
      watch: false
    },
  ]
};
