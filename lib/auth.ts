import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      first_name: {
        type: "string",
        required: false
      },
      last_name: {
        type: "string",
        required: false
      },
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});