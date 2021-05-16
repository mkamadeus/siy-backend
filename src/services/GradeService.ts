import { IndexValueEnum } from '@/enum/IndexEnum';
import { LoEntry, LoOwner } from '@/enum/LoEnum';
import { Grade } from '@/models/Grade';
import { AcademicYear } from '@/models/LectureHistory';
import { prisma } from '@/repository/prisma';
import {
  calculateAverageGrade,
  // calculateSemesterGpa,
  calculateSemesterLo,
} from '@/utils/GradeUtils';
import {
  getMinAcademicYear,
  getMaxAcademicYear,
  isAcademicYearBetween,
  incrementAcademicYear,
} from '@/utils/LectureHistoryUtils';
import { plainToClass } from 'class-transformer';
import Container, { Service } from 'typedi';
import { LectureHistoryService } from './LectureHistoryService';
import { LectureService } from './LectureService';
import { StudentService } from './StudentService';
import { UploadService } from './UploadService';

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
    const semesterGpa = await calculateAverageGrade(grades);
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
    const gpa = calculateAverageGrade(grades);
    return gpa;
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
    const semesterLo = calculateSemesterLo(grades);
    return semesterLo;
  }

  // TODO: Get LO by student ID
  public async getLoByStudentId(): Promise<number[]> {
    return [];
  }

  /**
   * Get LO by grade entry
   * @param id Grade ID
   * @returns LO after being calculated
   */
  public async getLoById(id: number): number[] {
    const grade = await this.getGradeById(id);
    return await this.getLo(grade);
  }

  public async getLoByLectureId(lectureId: number) {
    const grades = await this.getGradesByLectureId(lectureId);
    const loWithOwners: LoOwner[] = await Promise.all(
      grades.map(async (grade) => {
        const los = await this.getLoById(grade.id);
        return {
          gradeId: grade.id,
          los,
        };
      })
    );
    return loWithOwners;
  }

  /**
   *
   * @param nim Student's NIM
   * @returns Cumulative LO for the student
   */
  public async getCumulativeLoByNim(nim: string) {
    const grades = await this.getGradesByNim(nim);

    return await this.getCumulativeSum(grades);
  }

  public async getLOPerSemester(nim: string, year: number, semester: number) {
    const grades = await this.getGradesByNimPerSemester(nim, year, semester);

    return await this.getCumulativeSum(grades);
  }

  public async getCumulativeSum(grades: Grade[]) {
    let cumulativeSum: LoEntry = {
      loA: 0,
      loB: 0,
      loC: 0,
      loD: 0,
      loE: 0,
      loF: 0,
      loG: 0,
    };

    const totalWeight: LoEntry = {
      loA: 0,
      loB: 0,
      loC: 0,
      loD: 0,
      loE: 0,
      loF: 0,
      loG: 0,
    };

    for (const grade of grades) {
      const loList = await this.getLo(grade);
      const kmtList = await Container.get(LectureService).getKMT(
        grade.lectureId
      );
      if (cumulativeSum) {
        for (const key in cumulativeSum) {
          cumulativeSum[key] += loList[key] * kmtList[key];
          totalWeight[key] += kmtList[key];
        }
      } else {
        cumulativeSum = loList;
      }
    }

    for (const key in cumulativeSum) {
      if (totalWeight[key] == 0) {
        cumulativeSum[key] = 0;
      } else {
        cumulativeSum[key] /= totalWeight[key];
      }
    }

    return cumulativeSum;
  }

  public async updateAll(grade: Grade): Promise<void> {
    // tar aja y hehe pokoknya update ipk dan LO suplemen semuanya
  }

  public async create(studentGrade: Grade): Promise<Grade> {
    const result = await prisma.grade.save(studentGrade);
    const updatedGrade = this.updateLO(result);

    await this.updateAll(grade);

    return updatedGrade;
  }

  public async createByNim(nim: string, studentGrade: Grade): Promise<Grade> {
    try {
      const student = await Container.get(StudentService).getStudentByNim(nim);
      const result = await prisma.grade.save(
        plainToClass(Grade, {
          studentId: student.id,
          ...studentGrade,
        })
      );
      return result;
    } catch (err) {
      throw new EvalError(`Error on ${nim}: ${err.message}`);
    }
  }

  public async createBulk(
    lectureId: number,
    year: number,
    semester: number,
    file: Express.Multer.File
  ) {
    const fileContent = (
      await Container.get(UploadService).parseExcel(file.filename, 3)
    ).slice(1);

    const nimArray = fileContent.map((row) => row[0].toString());
    const gradeArray = fileContent.map((row) => {
      const grades = row.slice(2);
      return {
        finalTest: parseFloat(grades[0].toString()),
        midTest: parseFloat(grades[1].toString()),
        practicum: parseFloat(grades[2].toString()),
        homework: parseFloat(grades[3].toString()),
        quiz: parseFloat(grades[4].toString()),
        index: grades[6].toString(),
      };
    });

    if (nimArray.length !== gradeArray.length)
      throw new Error('Array length must be the same!');

    const errorArray = [];
    for (let i = 0; i < nimArray.length; i++) {
      try {
        const body = {
          lectureId,
          year,
          semester,
          ...gradeArray[i],
        };
        await this.createByNim(nimArray[i], body);
      } catch (err) {
        errorArray.push((err as Error).message);
      }
    }

    return { errors: errorArray };
  }

  public async updateGrade(
    id: number,
    studentGrade: Partial<Grade>
  ): Promise<Grade> {
    studentGrade.id = id;
    // await prisma.grade.update(
    //   studentGrade.id,
    //   plainToClass(Grade, { id: studentGrade.id, ...studentGrade })
    // );
    await prisma.grade.save(plainToClass(Grade, studentGrade));
    const grade = await this.getGradeById(id);

    return await this.updateLO(grade);
  }

  public async updateLO(grade: Grade): Promise<Grade> {
    // update LO
    // const grade = await Container.get(GradeService).getOne(this.id);
    const student = await Container.get(StudentService).getStudentById(
      grade.studentId
    );
    const lo = await Container.get(GradeService).getCumulativeLoByNim(
      student.nim
    );

    await Container.get(StudentService).updateStudent(student.id, { ...lo });

    return this.getGradeById(grade.id);
  }

  public async updateByNim(nim: string, studentGrade: Grade): Promise<Grade> {
    const student = await Container.get(StudentService).getStudentByNim(nim);

    await prisma.grade.update(
      student.id,
      plainToClass(Grade, { studentId: student.id, ...studentGrade })
    );
    return this.getGradeById(student.id);
  }

  public async delete(id: number): Promise<void> {
    await prisma.grade.delete(id);
    return;
  }
}
