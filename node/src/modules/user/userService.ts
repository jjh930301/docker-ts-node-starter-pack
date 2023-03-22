import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { UserEntity } from "../../db/entities/userEntity";
import ServiceData from "../../utils/servicedata";
import { IModifyUser } from "./dto/ImodifyUserDto";
import { UserRepository } from "./userRepository";


export class UserService {

  private readonly userRepo : UserRepository = new UserRepository();

  public async user(userId : string) {
    try {
      const user = await this.userRepo.findById(userId);
      if(!user) {
        return ServiceData.ok('not found user' , {user : null} , 2001)
      }
      return ServiceData.ok('Successfully getting user' , {user} , 2000)
    } catch(e) {
      return ServiceData.serverError(e);
    }
  }

  public async modifyUser(userId : string , body : IModifyUser) : Promise<any> {
    try {
      const obj : QueryDeepPartialEntity<UserEntity> = {};
      Promise.all(Object.keys(body).map(key => {
        if(body[key]) {
          obj[key] = body[key]
        }
      }))
      const user = await this.userRepo.updateUser(userId , obj);
      if(user?.affected === 1)
        return ServiceData.ok("Successfully modified user" , {result : true} , 2000)
      return ServiceData.cannotAccess('not found user' , 4003)
    } catch(e) {
      return ServiceData.serverError(e);
    }
  }
}