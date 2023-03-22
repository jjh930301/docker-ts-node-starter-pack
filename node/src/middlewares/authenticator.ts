import { Request } from "express";
import JwtUtil from "../utils/jwtUtil";
import ServiceData from "../utils/servicedata";

// export type info = { id: string; email: string , type : number};

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): any{
  const jwt = new JwtUtil();
  if (securityName === "api_key") {
    let token;
    if (request.query && request.query.access_token) {
      token = request.query.access_token;
    }

    if (token === "abc123456") {
      return Promise.resolve({result : true})
    } else {
      return Promise.resolve({});
    }
  }

  if (securityName === "jwt") {
    const user = JwtUtil.getUserFromToken(request)
    if(!user) {
      return Promise.resolve(ServiceData.notAuthorized(" UnAuthorize"));
    }
    return Promise.resolve(user)
  }
}