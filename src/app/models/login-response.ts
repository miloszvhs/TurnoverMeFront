export interface LoginResponse {
  userId: string;
  tokenType: string;
  jwtToken: string;
  isLoggedIn: string;
  expiresIn: number;
  refreshToken: string;
  forcePasswordChange: boolean | undefined;
}
