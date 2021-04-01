import "reflect-metadata";
import Course from "@/entity/Course";
import { typeormLoader } from "@/loaders/typeormLoader";
import { CourseService } from "@/services/CourseService";
import { expect } from "chai";
import { Container } from "typedi";
import { Connection } from "typeorm";

let connection: Connection;

describe("CourseService test", () => {
  before(async () => {
    connection = await typeormLoader();
  });

  describe("#1 Course creation", () => {
    let courseId: number;
    it("should have 0 course", (done) => {
      const courseService = Container.get(CourseService);
      courseService.getAll().then((courseArray) => {
        expect(courseArray.length).to.be.equal(0);
        done();
      });
    });
    it("should have created 1 course", (done) => {
      const courseService = Container.get(CourseService);
      courseService
        .create({
          //   code: "IF3250",
          name: "Proyek Perangkat Lunak",
          //   sks: 4,
        } as Course)
        .then((course) => {
          courseId = course.id;
          expect(course.name).to.be.equal("Proyek Perangkat Lunak");
          return courseService.getAll();
        })
        .then((courseArray) => {
          expect(courseArray.length).to.be.equal(1);
          done();
        });
    });
    it("should deleted the entry", (done) => {
      const courseService = Container.get(CourseService);
      courseService
        .delete(courseId)
        .then(() => {
          return courseService.getAll();
        })
        .then((courseArray) => {
          expect(courseArray.length).to.be.equal(0);
          done();
        });
    });
  });

  after(() => {
    connection.close();
  });
});
