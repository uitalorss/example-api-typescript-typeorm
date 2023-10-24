import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Room } from "./Room";

@Entity("subjects")
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "text" })
  name: string;
  @ManyToMany(() => Room, (room) => room.subjects)
  @JoinTable({
    name: "room_subject",
    joinColumn: {
      name: "subject_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "room_id",
      referencedColumnName: "id",
    },
  })
  rooms: Room[];
}
