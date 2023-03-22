import JwtUtil from "../../utils/jwtUtil";
import ServiceData from "../../utils/servicedata";
import { UserRepository } from "../user/userRepository";
import { IRegistUser } from "./dto/IregistUserDto";

export class AuthService {

  private readonly userRepo : UserRepository = new UserRepository();

  public async regist(body: IRegistUser): Promise<any> {
    try {
      const user = await this.userRepo.createUser(body);
      if(!user) return ServiceData.badRequest('' , 'user' , 4004);
      const accessToken = JwtUtil.createJWT(user.identifiers[0]?.id , body.email , body.type);
      return ServiceData.dataRegistered('user' , {
        email : body.email,
        mobile : body.mobile,
        accessToken
      });
      
    } catch(e) {
      return ServiceData.serverError(e);
    }
  }
}