/*
  Warnings:

  - The primary key for the `RatingQuestionnaire` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RatingQuestionnaire` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RatingQuestionnaire" DROP CONSTRAINT "RatingQuestionnaire_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("studentId", "lectureId");
