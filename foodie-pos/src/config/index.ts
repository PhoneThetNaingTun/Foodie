interface Config {
  googleClientId: string;
  googleClientSecret: string;
  backOfficeApi: string;
}

export const config: Config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  backOfficeApi: process.env.NEXT_PUBLIC_BACK_OFFICE_BASE_API || "",
};
