/*
  Warnings:

  - You are about to drop the column `question_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `lecture_id` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `brief_syllabus` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `complete_syllabus` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `course_id` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_a_kmt_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_b_kmt_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_c_kmt_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_d_kmt_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_e_kmt_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_f_kmt_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_g_kmt_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_a_final_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_b_final_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_c_final_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_d_final_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_e_final_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_f_final_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_g_final_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_a_mid_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_b_mid_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_c_mid_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_d_mid_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_e_mid_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_f_mid_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_g_mid_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_a_homework_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_b_homework_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_c_homework_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_d_homework_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_e_homework_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_f_homework_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_g_homework_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_a_quiz_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_b_quiz_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_c_quiz_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_d_quiz_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_e_quiz_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_f_quiz_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_g_quiz_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_a_practicum_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_b_practicum_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_c_practicum_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_d_practicum_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_e_practicum_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_f_practicum_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lo_g_practicum_weight` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `loA` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `loB` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `loC` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `loD` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `loE` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `loF` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `loG` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `StudentGrade` table. All the data in the column will be lost.
  - You are about to drop the column `index` on the `StudentGrade` table. All the data in the column will be lost.
  - You are about to drop the column `lo_a` on the `StudentGrade` table. All the data in the column will be lost.
  - You are about to drop the column `lo_b` on the `StudentGrade` table. All the data in the column will be lost.
  - You are about to drop the column `lo_c` on the `StudentGrade` table. All the data in the column will be lost.
  - You are about to drop the column `lo_d` on the `StudentGrade` table. All the data in the column will be lost.
  - You are about to drop the column `lo_e` on the `StudentGrade` table. All the data in the column will be lost.
  - You are about to drop the column `lo_f` on the `StudentGrade` table. All the data in the column will be lost.
  - You are about to drop the column `lo_g` on the `StudentGrade` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `StudentLecture` table. All the data in the column will be lost.
  - You are about to drop the column `lecture_id` on the `StudentLecture` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_name` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `TeacherLecture` table. All the data in the column will be lost.
  - You are about to drop the column `lecture_id` on the `TeacherLecture` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `briefSyllabus` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completeSyllabus` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `StudentGrade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `StudentLecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lectureId` to the `StudentLecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherName` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `TeacherLecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lectureId` to the `TeacherLecture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_lecture_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Lecture" DROP CONSTRAINT "Lecture_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_user_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentGrade" DROP CONSTRAINT "StudentGrade_student_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentLecture" DROP CONSTRAINT "StudentLecture_lecture_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentLecture" DROP CONSTRAINT "StudentLecture_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TeacherLecture" DROP CONSTRAINT "TeacherLecture_lecture_id_fkey";

-- DropForeignKey
ALTER TABLE "TeacherLecture" DROP CONSTRAINT "TeacherLecture_teacher_id_fkey";

-- DropIndex
DROP INDEX "Student.user_id_unique";

-- DropIndex
DROP INDEX "Teacher.user_id_unique";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "question_id",
DROP COLUMN "student_id",
DROP COLUMN "lecture_id",
ADD COLUMN     "lectureId" INTEGER;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "brief_syllabus",
DROP COLUMN "complete_syllabus",
ADD COLUMN     "briefSyllabus" VARCHAR NOT NULL,
ADD COLUMN     "completeSyllabus" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "course_id",
DROP COLUMN "lo_a_kmt_weight",
DROP COLUMN "lo_b_kmt_weight",
DROP COLUMN "lo_c_kmt_weight",
DROP COLUMN "lo_d_kmt_weight",
DROP COLUMN "lo_e_kmt_weight",
DROP COLUMN "lo_f_kmt_weight",
DROP COLUMN "lo_g_kmt_weight",
DROP COLUMN "lo_a_final_weight",
DROP COLUMN "lo_b_final_weight",
DROP COLUMN "lo_c_final_weight",
DROP COLUMN "lo_d_final_weight",
DROP COLUMN "lo_e_final_weight",
DROP COLUMN "lo_f_final_weight",
DROP COLUMN "lo_g_final_weight",
DROP COLUMN "lo_a_mid_weight",
DROP COLUMN "lo_b_mid_weight",
DROP COLUMN "lo_c_mid_weight",
DROP COLUMN "lo_d_mid_weight",
DROP COLUMN "lo_e_mid_weight",
DROP COLUMN "lo_f_mid_weight",
DROP COLUMN "lo_g_mid_weight",
DROP COLUMN "lo_a_homework_weight",
DROP COLUMN "lo_b_homework_weight",
DROP COLUMN "lo_c_homework_weight",
DROP COLUMN "lo_d_homework_weight",
DROP COLUMN "lo_e_homework_weight",
DROP COLUMN "lo_f_homework_weight",
DROP COLUMN "lo_g_homework_weight",
DROP COLUMN "lo_a_quiz_weight",
DROP COLUMN "lo_b_quiz_weight",
DROP COLUMN "lo_c_quiz_weight",
DROP COLUMN "lo_d_quiz_weight",
DROP COLUMN "lo_e_quiz_weight",
DROP COLUMN "lo_f_quiz_weight",
DROP COLUMN "lo_g_quiz_weight",
DROP COLUMN "lo_a_practicum_weight",
DROP COLUMN "lo_b_practicum_weight",
DROP COLUMN "lo_c_practicum_weight",
DROP COLUMN "lo_d_practicum_weight",
DROP COLUMN "lo_e_practicum_weight",
DROP COLUMN "lo_f_practicum_weight",
DROP COLUMN "lo_g_practicum_weight",
ADD COLUMN     "courseId" INTEGER NOT NULL,
ADD COLUMN     "loKmtWeight" DOUBLE PRECISION[],
ADD COLUMN     "loFinalTestWeight" DOUBLE PRECISION[],
ADD COLUMN     "loMidTestWeight" DOUBLE PRECISION[],
ADD COLUMN     "loHomeworkWeight" DOUBLE PRECISION[],
ADD COLUMN     "loQuizWeight" DOUBLE PRECISION[],
ADD COLUMN     "loPracticumWeight" DOUBLE PRECISION[];

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "user_id",
DROP COLUMN "loA",
DROP COLUMN "loB",
DROP COLUMN "loC",
DROP COLUMN "loD",
DROP COLUMN "loE",
DROP COLUMN "loF",
DROP COLUMN "loG",
ADD COLUMN     "userId" INTEGER,
ADD COLUMN     "lok" DOUBLE PRECISION[];

-- AlterTable
ALTER TABLE "StudentGrade" DROP COLUMN "student_id",
DROP COLUMN "index",
DROP COLUMN "lo_a",
DROP COLUMN "lo_b",
DROP COLUMN "lo_c",
DROP COLUMN "lo_d",
DROP COLUMN "lo_e",
DROP COLUMN "lo_f",
DROP COLUMN "lo_g",
ADD COLUMN     "studentId" INTEGER NOT NULL,
ADD COLUMN     "grade" "StudentGradeIndex",
ADD COLUMN     "lo" DOUBLE PRECISION[];

-- AlterTable
ALTER TABLE "StudentLecture" DROP COLUMN "student_id",
DROP COLUMN "lecture_id",
ADD COLUMN     "studentId" INTEGER NOT NULL,
ADD COLUMN     "lectureId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "teacher_name",
DROP COLUMN "user_id",
ADD COLUMN     "teacherName" VARCHAR NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "TeacherLecture" DROP COLUMN "teacher_id",
DROP COLUMN "lecture_id",
ADD COLUMN     "teacherId" INTEGER NOT NULL,
ADD COLUMN     "lectureId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student.userId_unique" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher.userId_unique" ON "Teacher"("userId");

-- AddForeignKey
ALTER TABLE "Answer" ADD FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentGrade" ADD FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentLecture" ADD FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentLecture" ADD FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherLecture" ADD FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherLecture" ADD FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
