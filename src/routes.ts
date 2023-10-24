import { Router } from "express";
import { SubjectController } from "./controllers/SubjectController";
import { RoomController } from "./controllers/RoomController";
import { videoController } from "./controllers/videoController";
import { roomRepository } from "./repositories/RoomRepository";

const routes = Router();

routes.post("/subject", new SubjectController().create);
routes.post("/room", new RoomController().create);
routes.post("/video", new videoController().create);
routes.post("/room/:idRoom/subject", new RoomController().bindSubjectToRoom);
routes.get("/rooms", new RoomController().list);

export default routes;
