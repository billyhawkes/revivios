import { AppConfig } from './interfaces/app.config';

export default (): AppConfig => ({
  port: parseInt(process.env.PORT) || 8000,

  auth: {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresInSeconds:
        parseInt(process.env.JWT_EXPIRATION_TIME_SECONDS) || 900,
    },
    github: {
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
});
