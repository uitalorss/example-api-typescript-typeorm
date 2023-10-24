import { Request, Response } from "express";
import { roomRepository } from "../repositories/RoomRepository";
import { subjectRepository } from "../repositories/SubjectRepository";
import { ErrorDescription } from "typeorm";
import { Subject } from "typeorm/persistence/Subject";

export class RoomController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    try {
      const newRoom = roomRepository.create({ name });
      await roomRepository.save(newRoom);
      return res.status(201).send();
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async bindSubjectToRoom(req: Request, res: Response) {
    const { idSubject } = req.body;
    const { idRoom } = req.params;

    try {
      const room = await roomRepository.findOne({
        where: { id: Number(idRoom) },
        relations: {
          subjects: true,
        },
      });

      if (!room) {
        return res.status(404).json({ message: "Sala não encontrada." });
      }

      const subject = await subjectRepository.findOne({
        where: { id: Number(idSubject) },
      });

      if (!subject) {
        return res.status(404).json({ message: "Disciplina não encontrada." });
      }

      room.subjects.push(subject);

      await roomRepository.save(room);

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const rooms = await roomRepository.find({
        relations: {
          subjects: true,
        },
      });
      return res.status(200).json(rooms);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
