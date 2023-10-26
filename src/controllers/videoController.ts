import { Request, Response } from "express";
import { roomRepository } from "../repositories/RoomRepository";
import { videoRepository } from "../repositories/videoRepository";
import { NotFoundError } from "../helpers/api-errors";

export class videoController {
  async create(req: Request, res: Response) {
    const { title, url, idRoom } = req.body;
    const room = await roomRepository.findOne({
      where: { id: Number(idRoom) },
    });
    if (!room) {
      throw new NotFoundError("Aula não encontrada");
    }

    const newVideo = videoRepository.create({
      title,
      url,
      room,
    });

    await videoRepository.save(newVideo);
    return res.status(201).send();
  }
}
