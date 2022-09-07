import { DataSourceOptions } from "typeorm";
import "dotenv/config";
import { Post } from "./entity/Post";

export const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASENAME,
  synchronize: true, // 처음 서버 실행 이후 false설정 필요
  logging: false,
  entities: [Post],
  charset: "utf8mb4",
};
