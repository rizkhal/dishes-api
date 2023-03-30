export type UserType = {
  id: number;
  username: string;
  password: string;
};

export type TokenList = {
  [key: string]: {
    expiredIn?: number;
    refreshToken?: string;
  };
};
