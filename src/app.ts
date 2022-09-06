import express, { Request, Response } from "express";
import cors from "cors";
// import swaggerUi from "swagger-ui-express";
// import router from "./routes";
// import swaggerOptions from "./swagger/swagger";
// import errorHandler from "./utils/error/errorHandler";

const app: express.Application = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.get("/welcome", (req: Request, res: Response) => {
  res.send("welcome!");
});

// Swagger 연결
// app.use(
//   "/swagger"
//      swaggerUi.serve,
//      swaggerUi.setup(swaggerFile, { explorer: true })
// );

// app.use("/api", router);

// 에러 핸들러
// app.use(errorHandler);
export default app;
