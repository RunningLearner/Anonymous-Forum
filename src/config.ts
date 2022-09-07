import "dotenv/config";

const env = process.env;

const config = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_NAME,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  port: env.MYSQL_PORT,
  logging: false,
  secretKey: env.SECRET_KEY,
};

export default config;
