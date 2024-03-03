export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PYTHON_HOST: string;
      DB_CONN_STRING: string;
    }
  }
}
