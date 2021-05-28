/*
  Warnings:

  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `imgPath` on the `Student` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "name",
DROP COLUMN "imgPath";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" VARCHAR NOT NULL,
ADD COLUMN     "imgPath" VARCHAR;
