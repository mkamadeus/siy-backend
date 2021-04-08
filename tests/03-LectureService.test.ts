import "reflect-metadata";
import Lecture from "@/entity/Lecture";
import { typeormLoader } from "@/loaders/typeormLoader";
import { LectureService } from "@/services/LectureService";
import { expect } from "chai";
import { Container } from "typedi";
import { Connection } from "typeorm";
import { CourseService } from "@/services/CourseService";
import Course from "@/entity/Course";

let connection: Connection;

describe("LectureService test", () => {
  before(async () => {
    connection = await typeormLoader();
  });

  describe("#1 Lecture creation", () => {
    let lecId: number;
    let courseId: number;
    it("should have 0 lecture", (done) => {
      const lectureService = Container.get(LectureService);
      lectureService.getAll().then((lectureArray) => {
        expect(lectureArray.length).to.be.equal(0);
        done();
      });
    });
    it("should create 1 lecture", (done) => {
      const courseService = Container.get(CourseService);
      const lectureService = Container.get(LectureService);
      courseService
        .create({
          code: "MS0001",
          credits: 2,
          name: "Mata Kuliah 1",
          briefSyllabus: "string",
          completeSyllabus: "string",
          outcome: "string",
        } as Course)
        .then((course) => {
          courseId = course.id;
          lectureService
            .create({
              courseId: courseId,
              semester: 3,
              year: 2021,
            } as Lecture)
            .then((lecture) => {
              lecId = lecture.id;
              expect(lecture.courseId).to.be.equal(courseId);
              expect(lecture.semester).to.be.equal(3);
              expect(lecture.year).to.be.equal(2021);
              expect(lecture.loAPracticumWeight).to.be.equal(0);
              return lectureService.getAll();
            })
            .then((lectureArray) => {
              expect(lectureArray.length).to.be.equal(1);
              done();
            });
        });
    });
    it("should update lecture loAPracticum Weight to 3, semester to 4", (done) => {
      const lectureService = Container.get(LectureService);
      console.log(courseId);
      lectureService
        .update(lecId, {
          courseId: courseId,
          semester: 4,
          year: 2021,
          loAPracticumWeight: 3,
        } as Lecture)
        .then((lecture) => {
          expect(lecture.courseId).to.be.equal(courseId);
          expect(lecture.semester).to.be.equal(4);
          expect(lecture.year).to.be.equal(2021);
          expect(lecture.loAPracticumWeight).to.be.equal(3);
          done();
        });
    });
    it("should delete the lecture entry", (done) => {
      const lectureService = Container.get(LectureService);
      const courseService = Container.get(CourseService);

      lectureService
        .delete(lecId)
        .then(() => {
          courseService
            .delete(courseId)
            .then(() => {
              return courseService.getAll();
            })
            .then((courseArray) => {
              console.log("halo");
              console.log(courseArray.length);
              expect(courseArray.length).to.be.equal(0);
            });
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
