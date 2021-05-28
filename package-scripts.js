module.exports = {
  scripts: {
    default: {
      script:
        'yarn schema:migrate && cross-env NODE_ENV=production ts-node-transpile-only -r tsconfig-paths/register src/app.ts',
      description: 'Run the API in production mode.',
    },
    prepare: {
      script: 'husky install',
      description: 'Setup husky',
    },
    dev: {
      script:
        'nodemon --exec ts-node-transpile-only -r tsconfig-paths/register src/app.ts',
      description: 'Run the API in development mode.',
    },
    seed: {
      config: {
        script:
          'ts-node -r tsconfig-paths/register ./node_modules/typeorm-seeding/dist/cli.js config',
        description: 'Check TypeORM config for seeding.',
      },
      run: {
        script:
          'ts-node -r tsconfig-paths/register  ./node_modules/typeorm-seeding/dist/cli.js seed',
        description:
          'Seed the database with predefined data from the seeds directory listed in the ORM config.',
      },
    },
    schema: {
      generate: {
        script: 'prisma generate',
        description: 'Generate Prisma Client and DBML.',
      },
      migrate: {
        script: 'prisma format && prisma generate && prisma migrate dev',
        description: 'Migrate schema to database.',
      },
      format: {
        script: 'prisma format',
        description: 'Format schema file.',
      },
    },
    test: {
      script:
        'cross-env NODE_ENV=test prisma migrate reset --force --skip-generate && cross-env NODE_ENV=test ts-mocha -r tsconfig-paths/register --paths tests/**/*.test.ts',
      description: 'Runs an automated testing on a set of prepared test.',
    },
    lint: {
      run: {
        script: 'eslint . --ext .ts --max-warnings=0',
        description: 'Lint the project.',
      },
      fix: {
        script:
          'prettier --config .prettierrc "src/**/*.ts" --write && eslint . --ext .ts --fix',
        description: 'Fix linting errors in the project.',
      },
    },
  },
};
