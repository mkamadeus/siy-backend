import "reflect-metadata";
import Teacher from "@/entity/Teacher";
import { typeormLoader } from "@/loaders/typeormLoader";
import { TeacherService } from "@/services/TeacherService";
import { expect } from "chai";
import { Container } from "typedi";
import { Connection } from "typeorm";

let connection: Connection;
before(async () => {
  connection = await typeormLoader();
});

describe("TeacherService test", () => {
  describe("#1 Teacher creation", () => {
    let teacherId: number;
    it("should have 0 teacher", (done) => {
      const teacherService = Container.get(TeacherService);
      teacherService.getAll().then((teacherArray) => {
        expect(teacherArray.length).to.be.equal(0);
        done();
      });
    });
    it("should have created 1 teacher", (done) => {
      const teacherService = Container.get(TeacherService);
      teacherService
        .create({
          name: "Yudistira Dwi Wardhana Asnar, ST., Ph.D.",
        } as Teacher)
        .then((teacher) => {
          teacherId = teacher.id;
          expect(teacher.name).to.be.equal(
            "Yudistira Dwi Wardhana Asnar, ST., Ph.D."
          );
          return teacherService.getAll();
        })
        .then((teacherArray) => {
          expect(teacherArray.length).to.be.equal(1);
          done();
        });
    });
    it("should deleted the entry", (done) => {
      const teacherService = Container.get(TeacherService);
      teacherService
        .delete(teacherId)
        .then(() => {
          return teacherService.getAll();
        })
        .then((teacherArray) => {
          expect(teacherArray.length).to.be.equal(0);
          done();
        });
    });
  });
});

after(() => {
  connection.close();
});
