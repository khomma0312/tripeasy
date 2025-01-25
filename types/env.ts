declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_URL: string;
      SITE_NAME: string;
      DATABASE_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      RESEND_FROM: string;
      RESEND_API_KEY: string;
      TRIP_ADVISOR_API_KEY: string;
      BLOB_READ_WRITE_TOKEN: string;
      GOOGLE_MAPS_API_KEY: string;
    }
  }
}

export {};
