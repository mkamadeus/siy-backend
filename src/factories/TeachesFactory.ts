import Lecture from "@/entity/Lecture";
import Teacher from "@/entity/Teacher";
import Teaches from "@/entity/Teaches";
import Faker from "faker";
import { define, factory } from "typeorm-seeding";

define(Teaches, (_faker: typeof Faker) => {
  const teaches = new Teaches();
  teaches.teacher = factory(Teacher)() as any;
  teaches.lecture = factory(Lecture)() as any;

  return teaches;
});
