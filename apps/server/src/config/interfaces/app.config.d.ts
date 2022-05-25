export interface AppConfig {
  NODE_ENV: string;
  port: number;
  auth: {
    jwt: {
      secret: string;
      expiresInSeconds: number;
    };
    github: {
      clientId: string;
      clientSecret: string;
      redirectURL: string;
    };
  };
  database: {
    type: string;
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
  };
  'auth.jwt.secret'?: string;
  'auth.jwt.expiresInSeconds'?: number;
  'auth.github.clientId'?: string;
  'auth.github.clientSecret'?: string;
  'auth.github.redirectURL'?: string;
  'database.type'?: string;
  'database.host'?: string;
  'database.port'?: number;
  'database.username'?: string;
  'database.password'?: string;
  'database.database'?: string;
}
