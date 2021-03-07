import Student from "@/entity/Student";
import Faker from "faker";
import { define } from "typeorm-seeding";

define(Student, (faker: typeof Faker) => {
  const student = new Student();
  student.name = faker.name.firstName();
  student.nim = faker.random
    .number({ min: 11111111, max: 99999999 })
    .toString();
  student.imgPath = faker.internet.avatar();

  return student;
});
