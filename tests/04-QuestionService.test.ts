import "reflect-metadata";
import Question from "@/entity/Question";
import { typeormLoader } from "@/loaders/typeormLoader";
import { QuestionService } from "@/services/QuestionService";
import { expect } from "chai";
import { Container } from "typedi";
import { Connection } from "typeorm";

let connection: Connection;
before (async() => {
    connection = await typeormLoader();
});

describe("QuestionService Test", () => {
    

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
            .create(
            {
                question: "Testing",
                answerType: "str"
            } as Question)
            .then(() => {
                questionService.getAll().then((questionArray) => {
                    expect(questionArray.length).to.be.equal(1);
                    done();
                });
            })
        });
    });
});

after(() => {
    connection.close();
});