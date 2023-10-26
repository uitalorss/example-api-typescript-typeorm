import { Request, Response } from "express";
import { roomRepository } from "../repositories/RoomRepository";
import { subjectRepository } from "../repositories/SubjectRepository";
import { ErrorDescription } from "typeorm";
import { Subject } from "typeorm/persistence/Subject";
import { addSubjectToRoom } from "../services/addSubjectToRoom";
import { NotFoundError } from "../helpers/api-errors";

export class RoomController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    const newRoom = roomRepository.create({ name });
    await roomRepository.save(newRoom);
    return res.status(201).send();
  }

  async bindSubjectToRoom(req: Request, res: Response) {
    const { idSubject } = req.body;
    const { idRoom } = req.params;
    const room = await roomRepository.findOne({
      where: { id: Number(idRoom) },
      relations: {
        subjects: true,
      },
    });

    if (!room) {
      throw new NotFoundError("Sala não encontrada.");
    }

    const subject = await subjectRepository.findOne({
      where: { id: Number(idSubject) },
    });

    if (!subject) {
      throw new NotFoundError("Disciplina não encontrada.");
    }

    addSubjectToRoom(room, subject);
    await roomRepository.save(room);
    return res.status(204).send();
  }

  async list(req: Request, res: Response) {
    const rooms = await roomRepository.find({
      relations: {
        subjects: true,
      },
    });
    return res.status(200).json(rooms);
  }
}
