import { Request } from 'express';
import jwt from 'jsonwebtoken';

export default class JwtUtil {
  static getUserFromToken = (req: Request): string | null => {
    const token = this.extractTokenFromRequest(req)
    if (!token) {
      return null
    }
    const jwtPayload = this.decodeJWT(token)
    return (jwtPayload as any) || null
  }

  static extractTokenFromRequest = (req: Request): string | undefined => {
    const TOKEN_PREFIX = 'Bearer '
    const auth = req.headers.authorization
    const token = auth?.includes(TOKEN_PREFIX)
      ? auth.split(TOKEN_PREFIX)[1]
      : auth
    return token
  }

  static decodeJWT = (token: string) => {
    try {
      const decodedToken = jwt.verify(token, '{your_secret}')
      return decodedToken;
    } catch {
      return null
    }
  }

  static createJWT = (id: string , email : string , type : number): any => {
    const token = jwt.sign(
      { 
        id,
        email,
        type
      },
      '{your_secret}',
    );
    return token;
  };
}