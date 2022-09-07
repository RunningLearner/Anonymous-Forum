import express, { Request, Response } from "express";
import cors from "cors";
import { dataSourceOptions } from "./data-source";
import { DataSource } from "typeorm";
import router from "./routes/index";
import swaggerUi from "swagger-ui-express";
import path from "path";
import YAML from "yamljs";
import morgan from "morgan";
import { errorHandler } from "./utils/error/errorHandler";

const app: express.Application = express();
const swaggerFile = YAML.load(path.join(__dirname, "./swagger/swagger-output.yaml"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/welcome", (req: Request, res: Response) => {
  res.send("welcome!");
});

//DB 연결
const AppDataSource = new DataSource(dataSourceOptions);
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

// Swagger 연결
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//dev router
app.use("/api", router);

// 에러 핸들러
app.use(errorHandler);
export default app;
