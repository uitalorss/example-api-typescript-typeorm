import { Request, Response } from "express";
import { subjectRepository } from "../repositories/SubjectRepository";

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    try {
      const newSubject = subjectRepository.create({ name });
      await subjectRepository.save(newSubject);
      return res.status(201).send();
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
