/*
  Warnings:

  - You are about to drop the column `student_id` on the `RatingQuestionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `lecture_id` on the `RatingQuestionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `rating_m_1` on the `RatingQuestionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `rating_m_3` on the `RatingQuestionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `rating_m_4` on the `RatingQuestionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `rating_m_5` on the `RatingQuestionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `rating_m_7` on the `RatingQuestionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `rating_m_8` on the `RatingQuestionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `rating_m_10` on the `RatingQuestionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `rating_m_11` on the `RatingQuestionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `rating_m_12` on the `RatingQuestionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `rating_m_2` on the `RatingQuestionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `rating_m_6` on the `RatingQuestionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `rating_m_9` on the `RatingQuestionnaire` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `RatingQuestionnaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lectureId` to the `RatingQuestionnaire` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RatingQuestionnaire" DROP CONSTRAINT "RatingQuestionnaire_lecture_id_fkey";

-- DropForeignKey
ALTER TABLE "RatingQuestionnaire" DROP CONSTRAINT "RatingQuestionnaire_student_id_fkey";

-- AlterTable
ALTER TABLE "RatingQuestionnaire" DROP COLUMN "student_id",
DROP COLUMN "lecture_id",
DROP COLUMN "rating_m_1",
DROP COLUMN "rating_m_3",
DROP COLUMN "rating_m_4",
DROP COLUMN "rating_m_5",
DROP COLUMN "rating_m_7",
DROP COLUMN "rating_m_8",
DROP COLUMN "rating_m_10",
DROP COLUMN "rating_m_11",
DROP COLUMN "rating_m_12",
DROP COLUMN "rating_m_2",
DROP COLUMN "rating_m_6",
DROP COLUMN "rating_m_9",
ADD COLUMN     "studentId" INTEGER NOT NULL,
ADD COLUMN     "lectureId" INTEGER NOT NULL,
ADD COLUMN     "ratings_m" DOUBLE PRECISION[];

-- AddForeignKey
ALTER TABLE "RatingQuestionnaire" ADD FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingQuestionnaire" ADD FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
