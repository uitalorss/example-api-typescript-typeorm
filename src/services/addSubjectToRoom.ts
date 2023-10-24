import { Room } from "../entities/Room";
import { Subject } from "../entities/Subject";

export function addSubjectToRoom(room: Room, subject: Subject) {
  room.subjects.map((item) => {
    if (item.id === subject.id) {
      return;
    }
    return;
  });
  return room.subjects.push(subject);
}
