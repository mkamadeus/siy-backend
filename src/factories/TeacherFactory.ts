import { define } from "typeorm-seeding";
import Teacher from "@/entity/Teacher";
import Faker from "faker";

define(Teacher, (faker: typeof Faker) => {
  const teacher = new Teacher();
  teacher.name = `${faker.name.title()} ${faker.name.firstName()}`;

  return teacher;
});
