import express, { Request, Response } from "express";
import cors from "cors";
import { dataSourceOptions } from "./data-source";
import { DataSource } from "typeorm";
import router from "./routes/index";
// import swaggerUi from "swagger-ui-express";
// import router from "./routes";
// import swaggerOptions from "./swagger/swagger";
// import errorHandler from "./utils/error/errorHandler";

const app: express.Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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
// app.use(
//   "/swagger"
//      swaggerUi.serve,
//      swaggerUi.setup(swaggerFile, { explorer: true })
// );

//dev router
app.use("/api", router);

// 에러 핸들러
// app.use(errorHandler);
export default app;
