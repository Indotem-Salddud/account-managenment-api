/**
 * ! Token interface use for pass user the token data
 * * whitehatdevv - 2021/12/12
 */

export const _tokenTableName = "JWTRefreshTokens";

export interface Token {
  token: string;
  expiration: Number;
  type: string;
  identity?: string;
}
