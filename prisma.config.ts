import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: (env('DATABASE_TARGET') === "production") ? env('DATABASE_URL_PRODUCTION') : env('DATABASE_URL'),
  },
});