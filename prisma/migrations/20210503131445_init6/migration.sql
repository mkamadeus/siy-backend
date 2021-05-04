/*
  Warnings:

  - You are about to drop the `StudentGrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentLecture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherLecture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentGrade" DROP CONSTRAINT "StudentGrade_lectureId_fkey";

-- DropForeignKey
ALTER TABLE "StudentGrade" DROP CONSTRAINT "StudentGrade_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentLecture" DROP CONSTRAINT "StudentLecture_lectureId_fkey";

-- DropForeignKey
ALTER TABLE "StudentLecture" DROP CONSTRAINT "StudentLecture_studentId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherLecture" DROP CONSTRAINT "TeacherLecture_lectureId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherLecture" DROP CONSTRAINT "TeacherLecture_teacherId_fkey";

-- DropTable
DROP TABLE "StudentGrade";

-- DropTable
DROP TABLE "StudentLecture";

-- DropTable
DROP TABLE "TeacherLecture";

-- CreateTable
CREATE TABLE "Grade" (
    "id" SERIAL NOT NULL,
    "grade" "StudentGradeIndex",
    "lo" DOUBLE PRECISION[],
    "quiz" DOUBLE PRECISION DEFAULT 0,
    "midTest" DOUBLE PRECISION DEFAULT 0,
    "finalTest" DOUBLE PRECISION DEFAULT 0,
    "practicum" DOUBLE PRECISION DEFAULT 0,
    "homework" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LectureHistory" (
    "studentId" INTEGER NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "attendance" DOUBLE PRECISION NOT NULL DEFAULT 0,

    PRIMARY KEY ("studentId","lectureId","gradeId")
);

-- CreateTable
CREATE TABLE "TeachingHistory" (
    "teacherId" INTEGER NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "portfolio" DOUBLE PRECISION DEFAULT 0,

    PRIMARY KEY ("teacherId","lectureId")
);

-- CreateIndex
CREATE UNIQUE INDEX "LectureHistory_gradeId_unique" ON "LectureHistory"("gradeId");

-- AddForeignKey
ALTER TABLE "LectureHistory" ADD FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LectureHistory" ADD FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LectureHistory" ADD FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingHistory" ADD FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingHistory" ADD FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
