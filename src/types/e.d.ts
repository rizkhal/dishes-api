export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "test" | "dev" | "prod" | "staging";
      // database
      DATABASE_URL: string;
      // jwt
      JWT_TOKEN: string;
      JWT_REFRESH_TOKEN: string;
      TOKEN_EXPIRED_AT: string;
      JWT_REFRESH_TOKEN_EXPIRED_AT: string;
    }
  }
}

export declare module "jsonwebtoken" {
  interface JwtPayload {
    userId: number;
    username: string;
  }

  export function verify(
    token: string,
    secretOrPublicKey: Secret,
    options?: VerifyOptions & { complete?: false },
  ): JwtPayload;
}
