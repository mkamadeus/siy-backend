-- CreateEnum
CREATE TYPE "StudentGradeIndex" AS ENUM ('A', 'AB', 'B', 'BC', 'C', 'D', 'E', 'T');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'TEACHER', 'ADMIN');

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER,
    "studentId" INTEGER,
    "courseId" INTEGER,
    "strAnswer" VARCHAR NOT NULL DEFAULT E'',
    "intAnswer" INTEGER NOT NULL DEFAULT 0,
    "fileAnswer" VARCHAR NOT NULL DEFAULT E'',
    "formId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "question_id" INTEGER,
    "student_id" INTEGER,
    "lecture_id" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "credits" INTEGER NOT NULL,
    "brief_syllabus" VARCHAR NOT NULL,
    "complete_syllabus" VARCHAR NOT NULL,
    "outcome" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "lo_a_kmt_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_b_kmt_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_c_kmt_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_d_kmt_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_e_kmt_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_f_kmt_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_g_kmt_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_a_final_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_b_final_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_c_final_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_d_final_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_e_final_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_f_final_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_g_final_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_a_mid_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_b_mid_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_c_mid_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_d_mid_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_e_mid_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_f_mid_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_g_mid_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_a_homework_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_b_homework_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_c_homework_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_d_homework_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_e_homework_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_f_homework_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_g_homework_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_a_quiz_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_b_quiz_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_c_quiz_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_d_quiz_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_e_quiz_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_f_quiz_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_g_quiz_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_a_practicum_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_b_practicum_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_c_practicum_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_d_practicum_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_e_practicum_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_f_practicum_weight" DOUBLE PRECISION DEFAULT 0,
    "lo_g_practicum_weight" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR NOT NULL,
    "answerType" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatingQuestionnaire" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "lecture_id" INTEGER NOT NULL,
    "rating_m_1" INTEGER NOT NULL,
    "rating_m_3" INTEGER NOT NULL,
    "rating_m_4" INTEGER NOT NULL,
    "rating_m_5" INTEGER NOT NULL,
    "rating_m_7" INTEGER NOT NULL,
    "rating_m_8" INTEGER NOT NULL,
    "rating_m_10" INTEGER NOT NULL,
    "rating_m_11" INTEGER NOT NULL,
    "rating_m_12" INTEGER NOT NULL,
    "rating_m_2" DOUBLE PRECISION NOT NULL,
    "rating_m_6" DOUBLE PRECISION NOT NULL,
    "rating_m_9" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "nim" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "imgPath" VARCHAR DEFAULT E'',
    "loA" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loB" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loC" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loD" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loE" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loF" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loG" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ipk" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentGrade" (
    "id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "index" "StudentGradeIndex",
    "lo_a" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lo_b" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lo_c" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lo_d" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lo_e" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lo_f" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lo_g" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "quiz" DOUBLE PRECISION DEFAULT 0,
    "mid_test" DOUBLE PRECISION DEFAULT 0,
    "final_test" DOUBLE PRECISION DEFAULT 0,
    "practicum" DOUBLE PRECISION DEFAULT 0,
    "homework" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lectureId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentLecture" (
    "id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "lecture_id" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "teacher_name" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherLecture" (
    "id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "lecture_id" INTEGER NOT NULL,
    "portofolio" DOUBLE PRECISION DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT E'STUDENT',
    "refreshToken" VARCHAR,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student.user_id_unique" ON "Student"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Student.nim_unique" ON "Student"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher.user_id_unique" ON "Teacher"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Answer" ADD FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingQuestionnaire" ADD FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingQuestionnaire" ADD FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentGrade" ADD FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentGrade" ADD FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentLecture" ADD FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentLecture" ADD FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherLecture" ADD FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherLecture" ADD FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
