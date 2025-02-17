export type JwtConfig = {
  jwtSecretKey: string;
  jwtExpiresIn: string;
  refreshToken: string;
  authRefreshTokenExpiresIn: string;
};
