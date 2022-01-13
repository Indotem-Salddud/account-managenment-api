/**
 * ! Token interface use for pass user the token data
 * * whitehatdevv - 2021/12/12
 */
export interface Token {
  token: string;
  refreshToken: string;
  expiration: Number;
  type: string;
  identity?: string;
}
