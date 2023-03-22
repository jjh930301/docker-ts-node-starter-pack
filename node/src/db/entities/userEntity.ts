import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SchemaNames } from "../../enums/schemaNames";
import { DatabaseNames } from "../../enums/databaseNames";
import { UserStatus } from "../../enums/userStatus";
@Entity({
  name : SchemaNames.users,
  database : DatabaseNames.DATABASE_NAME,
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id : string

  @Column({
    type : 'varchar',
    length : 125,
    nullable : false
  })
  email : string;

  @Column({
    type : 'varchar',
    length : 20,
    nullable : true
  })
  mobile : string;

  @Column({
    type : 'tinyint',
  })
  status : number;

  @Column({
    type : 'tinyint',
  })
  type : number
}