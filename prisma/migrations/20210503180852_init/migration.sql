/*
  Warnings:

  - You are about to drop the column `ipk` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "ipk",
ADD COLUMN     "gpa" DOUBLE PRECISION NOT NULL DEFAULT 0;
