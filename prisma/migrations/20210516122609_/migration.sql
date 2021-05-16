/*
  Warnings:

  - The primary key for the `LectureHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "LectureHistory" DROP CONSTRAINT "LectureHistory_pkey",
ALTER COLUMN "gradeId" DROP NOT NULL,
ADD PRIMARY KEY ("studentId", "lectureId");
