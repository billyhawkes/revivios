import { AppConfig } from './interfaces/app.config';

export default (): AppConfig => ({
  NODE_ENV: process.env.NODE_ENV,
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
      redirectURL: process.env.OAUTH_REDIRECT_URL,
    },
  },
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});
