type DynamicObject = { [name: string]: any };

export type TokenData = { tokenType: TokenType } & DynamicObject;

export enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
}

export interface GenerateTokenArgs {
  /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
  expiresIn?: string | number;
  data: TokenData;
}
