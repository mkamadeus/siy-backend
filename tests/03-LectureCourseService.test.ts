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
    it("should create 1 course", (done) => {
      const courseService = Container.get(CourseService);
      courseService
        .create({
          code: "IF3250",
          name: "Proyek Perangkat Lunak",
          credits: 4,
          briefSyllabus:
            "Kuliah ini memberikan gambaran kompleksitas dan pengalaman mengenai pengembangan perangkat lunak skala besar.",
          completeSyllabus:
            "Definisi perangkat lunak skala besar; berbagai ... Performance Engineering.",
          outcome:
            "1.Memahami definisi P/L skala besar serta berbagai persoalan pengembangan P/L skala besar ... and Performance Engineering.",
        } as Course)
        .then((course) => {
          courseId = course.id;
          expect(course.name).to.be.equal("Proyek Perangkat Lunak");
          return courseService.getAll();
        })
        .then((courseArray) => {
          expect(courseArray.length).to.be.equal(1);
          done();
        })

        .catch((e) => console.log("Here: ", e));
    });
    it("should create 1 lecture", (done) => {
      const lectureService = Container.get(LectureService);
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

    it("should update couse code to MS3250 and credits to 2", (done) => {
      const courseService = Container.get(CourseService);
      courseService
        .update(courseId, {
          code: "MS3250",
          credits: 2,
        } as Course)
        .then((course) => {
          expect(course.id).to.be.equal(courseId);
          expect(course.code).to.be.equal("MS3250");
          expect(course.credits).to.be.equal(2);
          done();
        });
    });
    it("should delete the lecture and course entry", (done) => {
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
