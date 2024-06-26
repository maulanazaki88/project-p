export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PYTHON_HOST: string;
      DB_CONN_STRING: string;
      NEXT_PUBLIC_BASE_URL: string;
      JWT_SECRET: string
    }
  }
}
