interface Config {
  googleClientId: string;
  googleClientSecret: string;
  backOfficeApi: string;
  spaceEndPoint: string;
  spaceAccessKeyId: string;
  spaceScretAccessKey: string;
  orderAppUrl: string;
  orderAppApiUrl: string;
}

export const config: Config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  backOfficeApi: process.env.NEXT_PUBLIC_BACK_OFFICE_BASE_API || "",
  spaceEndPoint: process.env.SPACE_ENDPOINT || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceScretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY || "",
  orderAppUrl: process.env.NEXT_PUBLIC_ORDER_APP_URL || "",
  orderAppApiUrl: process.env.NEXT_PUBLIC_ORDER_APP_API_URL || "",
};
