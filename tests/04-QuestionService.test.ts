import "reflect-metadata";
import Question from "@/entity/Question";
import { typeormLoader } from "@/loaders/typeormLoader";
import { QuestionService } from "@/services/QuestionService";
import { expect } from "chai";
import { Container } from "typedi";
import { Connection } from "typeorm";

let connection: Connection;
before(async () => {
    connection = await typeormLoader();
});

describe("QuestionService test", () => {
    describe("#1 Question Creation and Update", () => {
        let questionId: number;
        
        // Test to get all questions
        it("should have 0 question", (done) => {
            const questionService = Container.get(QuestionService);
            
            questionService.getAll().then((questionArray) => {
                expect(questionArray.length).to.be.equal(0);
                done();
            });
        });

        // Test to create a question
        it("should have created 1 question", (done) => {
            const questionService = Container.get(QuestionService);
            
            questionService.create({
                question: "Seberapa sering Anda berkomunikasi dengan kelompok Anda?",
                answerType: "str"
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

        // Test to update a question
        it("should have update 1 question answerType", (done) => {
            const questionService = Container.get(QuestionService);

            questionService.getOne(questionId).then((question) => {
                expect(question.answerType).to.be.equal("str");
            })
            .then(() => {
                questionService.update(questionId, {
                    answerType: "int"
                } as Question);

                return questionService.getByAnswerType("int");
            })
            .then((questionArray) => {
                expect(questionArray.length).to.be.equal(1);
                done();
            });
        });

        // Test to delete a question
        it("should have deleted 1 question", (done) => {
            const questionService = Container.get(QuestionService);

            questionService.delete(questionId).then(() => {
                return questionService.getAll();
            })
            .then((questionArray) => {
                expect(questionArray.length).to.be.equal(0);
                done();
            });
        });
    });
});

after(() => {
    connection.close();
});