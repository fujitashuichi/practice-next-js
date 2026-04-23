// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL: string;
  }
}
