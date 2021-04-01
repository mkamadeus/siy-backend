import "reflect-metadata";
import Student from "@/entity/Student";
import { typeormLoader } from "@/loaders/typeormLoader";
import { StudentService } from "@/services/StudentService";
import { expect } from "chai";
import { Container } from "typedi";
import { Connection } from "typeorm";



describe("StudentService test", () => {
  let connection: Connection;
  before(async () => {
    connection = await typeormLoader();
  });

  describe("#1 Student creation", () => {
    let studentId: number;
    it("should have 0 student", (done) => {
      const studentService = Container.get(StudentService);
      studentService.getAll().then((studentArray) => {
        expect(studentArray.length).to.be.equal(0);
        done();
      });
    });
    it("should have created 1 student", (done) => {
      const studentService = Container.get(StudentService);
      studentService
        .create({
          name: "Annisa Rahim",
          nim: "13518089"
        } as Student)
        .then((student) => {
          studentId = student.id;
          expect(student.name).to.be.equal(
            "Annisa Rahim"
          );
          expect(student.nim).to.be.equal(
            "13518089"
          );
          return studentService.getAll();
        })
        .then((studentArray) => {
          expect(studentArray.length).to.be.equal(1);
          done();
        });
    });
    it("should deleted the entry", (done) => {
      const studentService = Container.get(StudentService);
      studentService
        .delete(studentId)
        .then(() => {
          return studentService.getAll();
        })
        .then((studentArray) => {
          expect(studentArray.length).to.be.equal(0);
          done();
        });
    });
  });

  after(() => {
    connection.close();
  });
});



// after(async () => {
//   const entities = getConnection().entityMetadatas;
//   for (const entity of entities) {
//     const repository = getConnection().getRepository(entity.name);
//     await repository.clear();
//   }
// });
