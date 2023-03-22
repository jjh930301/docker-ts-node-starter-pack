import express, { Response , Request } from "express";
import swaggerUi from "swagger-ui-express";
import {RegisterRoutes} from '../build/routes'
import { DB } from "./db/database";

export const app = express();

// Use body parser to read sent json payloads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json())

app.use("/docs", swaggerUi.serve, async (req: Request, res: Response) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"))
  );
});
DB.initialize().then(async () => {
  console.log("Successfully mysql database connection")
})

RegisterRoutes(app);