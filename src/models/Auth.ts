export interface DecodedToken {
  id: number;
  role: string;
  iat: number;
  exp: number;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
