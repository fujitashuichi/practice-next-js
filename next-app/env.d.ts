import { Logger } from "pino";

// env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string;
      readonly LOG_LEVEL: Exclude<Logger["level"], "silent">;
    }
  }
}
