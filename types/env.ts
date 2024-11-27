declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_URL: string;
      SITE_NAME: string;
      DATABASE_URL: string;
    }
  }
}

export {};
