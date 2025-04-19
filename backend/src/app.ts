import express, { json } from "express";
import config from "config";
import sequelize from "./db/sequelize";
import errorLogger from "./middlewares/error/error-logger";
import errorResponder from "./middlewares/error/error-responder";
import notFound from "./middlewares/not-found";
import { extractUserFromToken, requireAuth } from "./middlewares/auth/auth";
import fileUpload from "express-fileupload";
import cors from "cors";

import authRouter from "./routers/auth";
import vacationsRouter from "./routers/vacations";
import followsRouter from "./routers/follows";
import { createAppBucketIfNotExist } from "./aws/aws";

import http from "http";
import { Server } from "socket.io";

const port = config.get<string>("app.port");
const name = config.get<string>("app.name");
const force = config.get<boolean>("sequelize.sync.force");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

declare global {
  namespace Express {
    interface Request {
      io?: Server;
    }
  }
}

(async () => {
  await sequelize.sync({ alter: true });
  await createAppBucketIfNotExist();
  // extract photos
  app.use(express.static("public"));

  app.use(cors());
  app.use(json());
  app.use(fileUpload());

  // io
  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  app.use("/auth", authRouter);

  app.use("/vacations", extractUserFromToken, requireAuth, vacationsRouter);

  app.use(notFound);
  app.use(errorLogger);
  app.use(errorResponder);

  server.listen(port, () => console.log(`${name} started on port ${port}...`));
})();
export default app;
