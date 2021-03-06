import Course from "@/entity/Course";
import Lecture from "@/entity/Lecture";
import Faker from "faker";
import { define, factory } from "typeorm-seeding";

define(Lecture, (_faker: typeof Faker) => {
  const lecture = new Lecture();
  lecture.semester = 2020;
  lecture.year = Math.ceil(Math.random() * 2);
  lecture.course = factory(Course)() as any;

  return lecture;
});
