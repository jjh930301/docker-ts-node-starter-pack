import { Inject } from "tsoa";
import { InsertResult, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { DB } from "../../db/database";
import { UserEntity } from "../../db/entities/userEntity";
import { SchemaNames } from "../../enums/schemaNames";
import { UserStatus } from "../../enums/userStatus";
import { IRegistUser } from "../auth/dto/IregistUserDto";

@Inject()
export class UserRepository{

  public async createUser(body : IRegistUser) : Promise<InsertResult | null> {
    try {
      return await DB.createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
          email : body.email,
          mobile : body.mobile,
          status : UserStatus.active,
          type : body.type,
        })
        .execute()
    } catch(e) {
      return null;
    }
  }

  public async findById(userId : string) : Promise<UserEntity | null>{
    try {
      return await DB.createQueryBuilder()
        .from(UserEntity , SchemaNames.users)
        .select([
          `${SchemaNames.users}.email`,
          `${SchemaNames.users}.mobile`,
          `${SchemaNames.users}.status`,
          `${SchemaNames.users}.type`,
        ])
        .where(`${SchemaNames.users}.id = :userId` , {userId : userId})
        .getOne();
    } catch(e) {
      return null;
    }
  }

  public async updateUser(userId : string , values : QueryDeepPartialEntity<UserEntity>) : Promise<UpdateResult | null> {
    try {
      return await DB.createQueryBuilder()
        .update(UserEntity)
        .set(values)
        .where(`${SchemaNames.users}.id = :id` , {
          id : userId
        })
        .execute()
    } catch(e) {
      return null
    }
  }
}