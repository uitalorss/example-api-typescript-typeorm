import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import { ApiError } from "./helpers/api-errors";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.use(routes);

  app.use(
    (
      error: Error & Partial<ApiError>,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const statusCode = error.statusCode ?? 500;
      const message = error.statusCode
        ? error.message
        : "Internal Server Error.";
      return res.status(statusCode).json({ message: message });
    }
  );

  return app.listen(process.env.PORT);
});
