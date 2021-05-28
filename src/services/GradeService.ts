import { Grade, GradeCreateInput, GradeUpdateInput } from '@/models/Grade';
import { Student } from '@/models/Student';
import { AcademicYear } from '@/models/LectureHistory';
import { prisma } from '@/repository/prisma';
import {
  calculateAverageGrade,
  calculateAverageLo,
  calculateGradeLo,
} from '@/utils/GradeUtils';
import {
  getMinAcademicYear,
  getMaxAcademicYear,
  isAcademicYearBetween,
  incrementAcademicYear,
} from '@/utils/LectureHistoryUtils';
// import { plainToClass } from 'class-transformer';
import Container, { Service } from 'typedi';
import { CourseService } from './CourseService';
import { LectureHistoryService } from './LectureHistoryService';
import { StudentService } from './StudentService';
import { UploadService } from './UploadService';
import { StudentGradeIndex } from '@prisma/client';

@Service()
export class GradeService {
  /**
   * Get all grades from database
   * @returns Grade array
   */
  public async getAllGrades(): Promise<Grade[]> {
    const grades = await prisma.grade.findMany();
    return grades;
  }

  public async getGradeById(id: number): Promise<Grade> {
    const grade = await prisma.grade.findUnique({ where: { id } });
    return grade;
  }

  public async getGradesByStudentId(studentId: number): Promise<Grade[]> {
    const histories = await Container.get(
      LectureHistoryService
    ).getLectureHistoryByStudentId(studentId);

    const grades = histories.map((history) => history.grade);
    return grades;
  }

  public async getGradesByNim(nim: string): Promise<Grade[]> {
    const student = await Container.get(StudentService).getStudentByNim(nim);
    return this.getGradesByStudentId(student.id);
  }

  public async getGradesByLectureId(lectureId: number): Promise<Grade[]> {
    const histories = await Container.get(
      LectureHistoryService
    ).getLectureHistoryByLectureId(lectureId);

    const grades = histories.map((history) => history.grade);
    return grades;
  }

  public async getGradesByStudentIdPerSemester(
    studentId: number,
    year: number,
    semester: number
  ): Promise<Grade[]> {
    const histories = await Container.get(
      LectureHistoryService
    ).getLectureHistoryByStudentId(studentId);

    const grades = histories
      .filter(
        (history) =>
          history.lecture.year === year && history.lecture.semester === semester
      )
      .map((history) => history.grade);
    return grades;
  }

  public async getGradesByNimPerSemester(
    nim: string,
    year: number,
    semester: number
  ): Promise<Grade[]> {
    const student = await Container.get(StudentService).getStudentByNim(nim);
    return this.getGradesByStudentIdPerSemester(student.id, year, semester);
  }

  public async getGradeByStudentLectureId(
    studentId: number,
    lectureId: number
    // year: number,
    // semester: number
  ): Promise<Grade> {
    const lecHistory = await Container.get(
      LectureHistoryService
    ).getLectureHistoryById(studentId, lectureId);
    const grade = await this.getGradeById(lecHistory.gradeId);
    return grade;
  }

  /**
   * Get the IPK of student by semester
   * @param studentId The student ID
   */
  public async getSemesterGpaByStudentId(
    studentId: number,
    year: number,
    semester: number
  ): Promise<number> {
    const grades = await this.getGradesByStudentIdPerSemester(
      studentId,
      year,
      semester
    );

    const credits = [];

    for (const grade of grades) {
      const lecHistory = await Container.get(
        LectureHistoryService
      ).getLectureHistoryByGradeId(grade.id);
      const course = await Container.get(CourseService).getCourseById(
        lecHistory.lecture.courseId
      );
      credits.push(course.credits);
    }

    const semesterGpa = calculateAverageGrade(credits, grades);
    return semesterGpa;
  }

  public async getAllSemesterGpaByStudentId(
    studentId: number
  ): Promise<number[]> {
    const histories = await Container.get(
      LectureHistoryService
    ).getLectureHistoryByStudentId(studentId);

    const minAcademicYear = getMinAcademicYear(histories);
    const maxAcademicYear = getMaxAcademicYear(histories);

    let currentAcademicYear: AcademicYear = {
      year: minAcademicYear.year,
      semester: minAcademicYear.semester,
    };

    const semesterGpas = [];
    while (
      isAcademicYearBetween(
        currentAcademicYear,
        minAcademicYear,
        maxAcademicYear
      )
    ) {
      const currentGpa = this.getSemesterGpaByStudentId(
        studentId,
        currentAcademicYear.year,
        currentAcademicYear.semester
      );
      semesterGpas.push(currentGpa);
      currentAcademicYear = incrementAcademicYear(currentAcademicYear);
    }

    return semesterGpas;
  }

  /**
   * Get the IPK of student by NIM
   * @param nim NIM of the student
   */
  public async getGpaByStudentId(studentId: number): Promise<number> {
    const grades = await this.getGradesByStudentId(studentId); // get all grades
    const credits = [];

    for (const grade of grades) {
      const lecHistory = await Container.get(
        LectureHistoryService
      ).getLectureHistoryByGradeId(grade.id);
      const course = await Container.get(CourseService).getCourseById(
        lecHistory.lecture.courseId
      );
      credits.push(course.credits);
    }

    const gpa = calculateAverageGrade(credits, grades);
    return gpa;
  }

  /**
   *
   * @param studentId
   * @returns
   */
  public async getCumulativeLoByStudentId(
    studentId: number
  ): Promise<number[]> {
    const grades = await this.getGradesByStudentId(studentId);

    return await this.getAvgLo(grades);
  }

  /**
   *
   * @param nim Student's NIM
   * @returns Cumulative LO for the student
   */
  public async getCumulativeLoByNim(nim: string): Promise<number[]> {
    const grades = await this.getGradesByNim(nim);

    return await this.getAvgLo(grades);
  }

  public async getSemesterLoByNIM(
    nim: string,
    year: number,
    semester: number
  ): Promise<number[]> {
    const grades = await this.getGradesByNimPerSemester(nim, year, semester);

    return await this.getAvgLo(grades);
  }

  public async getSemesterLoByStudentId(
    studentId: number,
    year: number,
    semester: number
  ): Promise<number[]> {
    const grades = await this.getGradesByStudentIdPerSemester(
      studentId,
      year,
      semester
    );

    return await this.getAvgLo(grades);
  }

  public async getAvgLo(grades: Grade[]): Promise<number[]> {
    const weights = [];
    for (const grade of grades) {
      const lecHistory = await Container.get(
        LectureHistoryService
      ).getLectureHistoryByGradeId(grade.id);
      const kmtWeight = lecHistory.lecture.loKmtWeight;
      weights.push(kmtWeight);
    }
    const lo = calculateAverageLo(weights, grades);
    return lo;
  }

  public async getGradeLo(grade: Grade): Promise<number[]> {
    const lecHistory = await Container.get(
      LectureHistoryService
    ).getLectureHistoryByGradeId(grade.id);

    const lecture = lecHistory.lecture;
    const lo = calculateGradeLo(lecture, grade);

    return lo;
  }

  /**
   * Get LO by grade entry
   * @param id Grade ID
   * @returns LO after being calculated
   */
  public async getLoById(id: number): Promise<number[]> {
    const grade = await this.getGradeById(id);
    return await this.getGradeLo(grade);
  }

  // TODO: Get LO by student ID
  public async getLoByStudentId(id: number): Promise<number[]> {
    const lo = await this.getCumulativeLoByStudentId(id);
    return lo;
  }

  // public async getLoByLectureId(lectureId: number) {
  //   const grades = await this.getGradesByLectureId(lectureId);
  //   const loWithOwners: LoOwner[] = await Promise.all(
  //     grades.map(async (grade) => {
  //       const los = await this.getLoById(grade.id);
  //       return {
  //         gradeId: grade.id,
  //         los,
  //       };
  //     })
  //   );
  //   return loWithOwners;
  // }

  public async updateAll(grade: Grade): Promise<Grade> {
    // update local LO, cumulative LO, GPA
    const lecHistory = await Container.get(
      LectureHistoryService
    ).getLectureHistoryByGradeId(grade.id);

    if (lecHistory !== null) {
      const updatedGrade = await this.updateLo(grade);
      await this.updateCumulativeLo(updatedGrade);
      await this.updateGPA(updatedGrade);

      return updatedGrade;
    } else {
      return grade;
    }
  }

  /**
   * Menyesuaikan nilai LO dengan inputan instance grade
   * @param grade instance yang diupdate
   * @returns grade dengan LO sudah terupdate
   */
  public async updateLo(grade: Grade): Promise<Grade> {
    const lo = await this.getGradeLo(grade);

    const updatedGrade = await prisma.grade.update({
      where: { id: grade.id },
      data: { lo: lo },
    });

    return updatedGrade;
  }

  public async updateCumulativeLo(grade: Grade): Promise<Student> {
    // update LO

    const lecHistory = await Container.get(
      LectureHistoryService
    ).getLectureHistoryByGradeId(grade.id);

    const student = lecHistory.student;

    const lo = await this.getCumulativeLoByStudentId(student.id);
    const updatedStudent = Container.get(StudentService).updateStudentLO(
      student.id,
      lo
    );
    // await prisma.student.update({
    //   where: { id: student.id },
    //   data: { lok: lo },
    // });

    return updatedStudent;
  }

  public async updateGPA(grade: Grade): Promise<Student> {
    const lecHistory = await Container.get(
      LectureHistoryService
    ).getLectureHistoryByGradeId(grade.id);

    const student = lecHistory.student;

    const gpa = await this.getGpaByStudentId(student.id);
    const updatedStudent = Container.get(StudentService).updateStudentGPA(
      student.id,
      gpa
    );
    return updatedStudent;
  }

  public async createGrade(data: GradeCreateInput): Promise<Grade> {
    const result = await prisma.grade.create({ data });
    const updatedGrade = await this.updateAll(result);

    return updatedGrade;
  }

  public async createBulk(
    lectureId: number,
    year: number,
    semester: number,
    file: Express.Multer.File
  ): Promise<{ errors: Error[] }> {
    const fileContent = (
      await Container.get(UploadService).parseExcel(file.filename, 3)
    ).slice(1);

    const nimArray = fileContent.map((row) => row[0].toString());
    const gradeArray = fileContent.map((row) => {
      const grades = row.slice(2);
      return {
        midTest: parseFloat(grades[0].toString()),
        finalTest: parseFloat(grades[1].toString()),
        practicum: parseFloat(grades[2].toString()),
        quiz: parseFloat(grades[3].toString()),
        homework: parseFloat(grades[4].toString()),
        grade: StudentGradeIndex[grades[6].toString()],
      };
    });

    if (nimArray.length !== gradeArray.length)
      throw new Error('Array length must be the same!');

    const errorArray = [];
    for (let i = 0; i < nimArray.length; i++) {
      try {
        const body = {
          ...gradeArray[i],
        };

        const student = await Container.get(StudentService).getStudentByNim(
          nimArray[i]
        );
        const grade = await this.getGradeByStudentLectureId(
          student.id,
          lectureId
        );

        if (grade === null) {
          // create new grade
          await this.createGrade(body);
          // assign grade id to lecture history
          await Container.get(LectureHistoryService).updateLectureHistory(
            student.id,
            lectureId,
            body
          );
        } else {
          // update grade
          this.updateGrade(grade.id, body);
        }
      } catch (err) {
        errorArray.push((err as Error).message);
      }
    }

    return { errors: errorArray };
  }

  public async updateGrade(id: number, data: GradeUpdateInput): Promise<Grade> {
    await prisma.grade.update({ where: { id }, data });
    const grade = await this.getGradeById(id);

    return await this.updateAll(grade);
  }

  public async delete(id: number): Promise<Grade> {
    const grade = await prisma.grade.delete({ where: { id } });
    return grade;
  }

  // TO DO: create & update one grade by nim, lectureId, or year semester

  //  public async updateByNim(
  //   nim: string,
  //   data: GradeUpdateInput
  // ): Promise<Grade> {
  //   const student = await Container.get(StudentService).getStudentByNim(nim);

  //   await prisma.grade.update(
  //     student.id,
  //     plainToClass(Grade, { studentId: student.id, ...studentGrade })
  //   );
  //   return this.getGradeById(student.id);
  // }

  // public async createByNim(nim: string, studentGrade: Grade): Promise<Grade> {
  // try {
  //   const student = await Container.get(StudentService).getStudentByNim(nim);
  //   const result = await prisma.grade.create(
  //     plainToClass(Grade, {
  //       studentId: student.id,
  //       ...studentGrade,
  //     })
  //   );
  //   return result;
  // } catch (err) {
  //   throw new EvalError(`Error on ${nim}: ${err.message}`);
  // }
  // }
}
