export interface AppConfig {
  port: number;

  auth: {
    jwt: {
      secret: string;
      expiresInSeconds: number;
    };
    github: {
      clientId: string;
      clientSecret: string;
      callbackURL: string;
    };
  };
  database: {
    host: string;
    port: string;
    user: string;
    pass: string;
    name: string;
  };
  'auth.jwt.secret'?: string;
  'auth.jwt.expiresInSeconds'?: number;
  'auth.github.clientId'?: string;
  'auth.github.clientSecret'?: string;
  'auth.github.callbackURL'?: string;
  'database.host'?: string;
  'database.port'?: number;
  'database.user'?: string;
  'database.pass'?: string;
  'database.name'?: string;
}
