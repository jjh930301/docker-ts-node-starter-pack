import { ConnectionOptions } from 'mysql2';
import { DataSource } from 'typeorm';
import { DatabaseNames } from '../enums/databaseNames';
import { UserEntity } from './entities/userEntity';

export const config = (
  database : string,
) : DataSource => {
  return new DataSource({
    type : 'mysql',
    host: 'mysql',
    port: 3306,
    username: 'root',
    password: 'password',
    database: database,
    charset: 'utf8mb4',
    entities: [
      __dirname+`/entities/*`,
    ],
    // logging : true,
    synchronize : true,
  })
}

export const DB : DataSource = config(DatabaseNames.DATABASE_NAME)