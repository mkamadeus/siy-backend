import "reflect-metadata";
import Question from "@/entity/Question";
import { typeormLoader } from "@/loaders/typeormLoader";
import { QuestionService } from "@/services/QuestionService";
import { expect } from "chai";
import { Container } from "typedi";
import { Connection } from "typeorm";

let connection: Connection;

describe("QuestionService test", () => {
  before(async () => {
    connection = await typeormLoader();
  });

  describe("#1 Question creation", () => {
    let questionId: number;
    it("should have 0 question", (done) => {
      const questionService = Container.get(QuestionService);
      questionService.getAll().then((questionArray) => {
        expect(questionArray.length).to.be.equal(0);
        done();
      });
    });
    it("should have created 1 question", (done) => {
      const questionService = Container.get(QuestionService);
      questionService
        .create({
          question: "Seberapa sering Anda berkomunikasi dengan kelompok Anda?",
          answerType: "int",
        } as Question)
        .then((question) => {
          questionId = question.id;
          expect(question.question).to.be.equal(
            "Seberapa sering Anda berkomunikasi dengan kelompok Anda?"
          );
          return questionService.getAll();
        })
        .then((questionArray) => {
          expect(questionArray.length).to.be.equal(1);
          done();
        });
    });
    it("should deleted the entry", (done) => {
      const questionService = Container.get(QuestionService);
      questionService
        .delete(questionId)
        .then(() => {
          return questionService.getAll();
        })
        .then((questionArray) => {
          expect(questionArray.length).to.be.equal(0);
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
