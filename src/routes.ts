import { Router } from "express";
import { SubjectController } from "./controllers/SubjectController";
import { RoomController } from "./controllers/RoomController";
import { videoController } from "./controllers/videoController";
import { roomRepository } from "./repositories/RoomRepository";
import { ApiError, BadRequestError } from "./helpers/api-errors";

const routes = Router();

routes.get("/", async (req, res) => {
  throw new BadRequestError("Caiu no erro.");
});

routes.post("/subject", new SubjectController().create);
routes.post("/room", new RoomController().create);
routes.post("/video", new videoController().create);
routes.post("/room/:idRoom/subject", new RoomController().bindSubjectToRoom);
routes.get("/rooms", new RoomController().list);

export default routes;
