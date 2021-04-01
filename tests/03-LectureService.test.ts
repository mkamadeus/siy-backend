import "reflect-metadata";
import Lecture from "@/entity/Lecture";
import { typeormLoader } from "@/loaders/typeormLoader";
import { LectureService } from "@/services/LectureService";
import { expect } from "chai";
import { Container } from "typedi";
import { Connection } from "typeorm";



describe("LectureService test", () => {
  let connection: Connection;
  before(async () => {
    connection = await typeormLoader();
  });
  
  describe("#1 Lecture creation", () => {
    let lecId: number;
    it("should have 0 lecture", (done) =>{
      const lectureService = Container.get(LectureService);
      lectureService
        .getAll()
        .then((lectureArray)=>{
          expect(lectureArray.length).to.be.equal(0);
          done();
        });
    });
    it("should create 1 lecture", (done) =>{
      const lectureService = Container.get(LectureService);
      lectureService
        .create({
          courseId: 1,
          semester: 3,
          year: 2021,
        } as Lecture)
        .then((lecture) =>{
          lecId = lecture.id;
          expect(lecture.courseId).to.be.equal(1);
          expect(lecture.semester).to.be.equal(3);
          expect(lecture.year).to.be.equal(2021);
          expect(lecture.loAPracticumWeight).to.be.equal(0);
          return lectureService.getAll();
        })
        .then((lectureArray) =>{
          expect(lectureArray.length).to.be.equal(1);
          done();
        });
    });
    it("should update lecture loAPracticum Weight to 3, semester to 4", (done) => {
      const lectureService = Container.get(LectureService);
      lectureService
        .update(lecId, {
          courseId: 1,
          semester: 4,
          year: 2021,
          loAPracticumWeight: 3,
        } as Lecture)
        .then((lecture) =>{
          expect(lecture.courseId).to.be.equal(1);
          expect(lecture.semester).to.be.equal(4);
          expect(lecture.year).to.be.equal(2021);
          expect(lecture.loAPracticumWeight).to.be.equal(3);
          done();
        });
    });
    it("should delete the lecture entry", (done) =>{
      const lectureService = Container.get(LectureService);
      lectureService
        .delete(lecId)
        .then(() => {
          return lectureService.getAll();
        })
        .then((lectureArray) => {
          expect(lectureArray.length).to.be.equal(0);
          done();
        });
    });
  });
  after(() => {
    connection.close();
  });
});


