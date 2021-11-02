declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_HOSTNAME: string;
    }
  }
}

export {};
