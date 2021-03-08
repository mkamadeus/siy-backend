import { define } from "typeorm-seeding";
import Course from "@/entity/Course";
import Faker from "faker";

define(Course, (faker: typeof Faker) => {
  const code = faker.random.alphaNumeric(6);
  const number = faker.random.number({ min: 1111, max: 9999 });

  const course = new Course();
  course.code = `${code}${number}`;
  course.name = faker.name.firstName();
  course.credits = faker.random.number(4);
  course.briefSyllabus = faker.lorem.sentence();
  course.completeSyllabus = faker.lorem.paragraph();
  course.outcome = faker.lorem.lines(3);

  return course;
});
