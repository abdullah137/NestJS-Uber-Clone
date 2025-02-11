export type AppConfig = {
  port: number;
  bcryptSalt: number;
  frontendDomain?: string;
  backendDomain: string;
  headerLanguage: string;
  fallbackLanguage: string;
  minPasswordLength: number;
  nodeEnv: string;
  maxPasswordLength: number;
  apiPrefix: string;
};
