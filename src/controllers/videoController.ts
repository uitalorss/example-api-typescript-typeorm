import { Request, Response } from "express";
import { roomRepository } from "../repositories/RoomRepository";
import { videoRepository } from "../repositories/videoRepository";

export class videoController {
  async create(req: Request, res: Response) {
    const { title, url, idRoom } = req.body;

    try {
      const room = await roomRepository.findOne({
        where: { id: Number(idRoom) },
      });
      if (!room) {
        return res.status(404).json({ message: "Aula não encontrada" });
      }

      const newVideo = videoRepository.create({
        title,
        url,
        room,
      });

      await videoRepository.save(newVideo);
      return res.status(201).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal Server error");
    }
  }
}
