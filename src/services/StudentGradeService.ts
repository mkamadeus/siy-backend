import StudentGrade from "@/entity/StudentGrade";
import { IndexValueEnum } from "@/enum/IndexEnum";
import { plainToClass } from "class-transformer";
import Container, { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { CourseService } from "./CourseService";
import { LectureService } from "./LectureService";
import { StudentService } from "./StudentService";

@Service()
export class StudentGradeService {
  private gradeRepository: Repository<StudentGrade> = getRepository(
    StudentGrade
  );

  public async getAll(): Promise<StudentGrade[]> {
    return await this.gradeRepository
      .find()
      .then((studentGrade) => studentGrade);
  }

  public async getOne(id: number): Promise<StudentGrade> {
    return await this.gradeRepository
      .findOne({ where: { id } })
      .then((studentGrade) => studentGrade);
  }

  public async getByNim(nim: string): Promise<StudentGrade[]> {
    const student = await Container.get(StudentService).getByNim(nim);
    return await this.gradeRepository
      .find({ where: { studentId: student.id } })
      .then((studentGrade) => studentGrade);
  }

  public async getByNimPerSemester(
    nim: string,
    year: number,
    semester: number
  ) {
    const student = await Container.get(StudentService).getByNim(nim);
    return await this.gradeRepository
      .find({ where: { studentId: student.id, semester, year } })
      .then((studentGrade) => studentGrade);
  }

  /**
   * Get the IPK of student by NIM
   * @param nim NIM of the student
   */
  public async getIpkByNim(nim: string): Promise<number> {
    const grades = await this.getByNim(nim);

    let total = 0;
    let totalCredits = 0;
    for (let grade of grades) {
      const lecture = await Container.get(LectureService).getOne(
        grade.lectureId
      );
      const course = await Container.get(CourseService).getOne(
        lecture.courseId
      );
      total += IndexValueEnum[grade.index] * course.credits;
      totalCredits += course.credits;
    }
    const ipk = total / totalCredits;
    return ipk;
  }

  /**
   * Get the IPK of student by semester
   * @param nim NIM of the student
   */
  public async getIpByNim(
    nim: string,
    year: number,
    semester: number
  ): Promise<number> {
    const grades = await this.getByNimPerSemester(nim, year, semester);

    let total = 0;
    let totalCredits = 0;
    for (let grade of grades) {
      const lecture = await Container.get(LectureService).getOne(
        grade.lectureId
      );
      const course = await Container.get(CourseService).getOne(
        lecture.courseId
      );
      total += IndexValueEnum[grade.index] * course.credits;
      totalCredits += course.credits;
    }
    const ip = total / totalCredits;
    return ip;
  }

  public async getLoById(id: number) {
    const grade = await this.getOne(id);
    const totalLo = {
      loA: 0,
      loB: 0,
      loC: 0,
      loD: 0,
      loE: 0,
      loF: 0,
      loG: 0,
    };
    const lecture = await Container.get(LectureService).getOne(grade.lectureId);
    const loATotalWeight =
      lecture.loAMidWeight +
      lecture.loAQuizWeight +
      lecture.loAFinalWeight +
      lecture.loAPracticumWeight +
      lecture.loAHomeworkWeight;
    const loBTotalWeight =
      lecture.loBMidWeight +
      lecture.loBQuizWeight +
      lecture.loBFinalWeight +
      lecture.loBPracticumWeight +
      lecture.loBHomeworkWeight;
    const loCTotalWeight =
      lecture.loCMidWeight +
      lecture.loCQuizWeight +
      lecture.loCFinalWeight +
      lecture.loCPracticumWeight +
      lecture.loCHomeworkWeight;
    const loDTotalWeight =
      lecture.loDMidWeight +
      lecture.loDQuizWeight +
      lecture.loDFinalWeight +
      lecture.loDPracticumWeight +
      lecture.loDHomeworkWeight;
    const loETotalWeight =
      lecture.loEMidWeight +
      lecture.loEQuizWeight +
      lecture.loEFinalWeight +
      lecture.loEPracticumWeight +
      lecture.loEHomeworkWeight;
    const loFTotalWeight =
      lecture.loFMidWeight +
      lecture.loFQuizWeight +
      lecture.loFFinalWeight +
      lecture.loFPracticumWeight +
      lecture.loFHomeworkWeight;
    const loGTotalWeight =
      lecture.loGMidWeight +
      lecture.loGQuizWeight +
      lecture.loGFinalWeight +
      lecture.loGPracticumWeight +
      lecture.loGHomeworkWeight;
    totalLo.loA =
      ((grade.midTest * lecture.loAMidWeight +
        grade.quiz * lecture.loAQuizWeight +
        grade.finalTest * lecture.loAFinalWeight +
        grade.practicum * lecture.loAPracticumWeight +
        grade.homework * lecture.loAHomeworkWeight) *
        4) /
      (loATotalWeight * 100);
    totalLo.loB =
      ((grade.midTest * lecture.loBMidWeight +
        grade.quiz * lecture.loBQuizWeight +
        grade.finalTest * lecture.loBFinalWeight +
        grade.practicum * lecture.loBPracticumWeight +
        grade.homework * lecture.loBHomeworkWeight) *
        4) /
      (loBTotalWeight * 100);
    totalLo.loC =
      ((grade.midTest * lecture.loCMidWeight +
        grade.quiz * lecture.loCQuizWeight +
        grade.finalTest * lecture.loCFinalWeight +
        grade.practicum * lecture.loCPracticumWeight +
        grade.homework * lecture.loCHomeworkWeight) *
        4) /
      (loCTotalWeight * 100);
    totalLo.loD =
      ((grade.midTest * lecture.loDMidWeight +
        grade.quiz * lecture.loDQuizWeight +
        grade.finalTest * lecture.loDFinalWeight +
        grade.practicum * lecture.loDPracticumWeight +
        grade.homework * lecture.loDHomeworkWeight) *
        4) /
      (loDTotalWeight * 100);
    totalLo.loE =
      ((grade.midTest * lecture.loEMidWeight +
        grade.quiz * lecture.loEQuizWeight +
        grade.finalTest * lecture.loEFinalWeight +
        grade.practicum * lecture.loEPracticumWeight +
        grade.homework * lecture.loEHomeworkWeight) *
        4) /
      (loETotalWeight * 100);
    totalLo.loF =
      ((grade.midTest * lecture.loFMidWeight +
        grade.quiz * lecture.loFQuizWeight +
        grade.finalTest * lecture.loFFinalWeight +
        grade.practicum * lecture.loFPracticumWeight +
        grade.homework * lecture.loFHomeworkWeight) *
        4) /
      (loFTotalWeight * 100);
    totalLo.loG =
      ((grade.midTest * lecture.loGMidWeight +
        grade.quiz * lecture.loGQuizWeight +
        grade.finalTest * lecture.loGFinalWeight +
        grade.practicum * lecture.loGPracticumWeight +
        grade.homework * lecture.loGHomeworkWeight) *
        4) /
      (loGTotalWeight * 100);

    return totalLo;
  }

  // public getLoByNimPerSemester(nim: string, year: number, semester: number) {
  //   const grades = await this.getByNimPerSemester(nim, year, semester);
  //   const totalLo = Array(7).fill(0);
  //   for (let grade of grades) {
  //     // Sum product of all LO

  //     grade.loA =
  //       midTest * lecture.loAMidWeight +
  //       quiz * lecture.loAQuizWeight +
  //       finalTest * lecture.loAFinalWeight +
  //       practicum * lecture.loAPracticumWeight +
  //       homework * lecture.loAHomeworkWeight;
  //     grade.loB =
  //       midTest * lecture.loBMidWeight +
  //       quiz * lecture.loBQuizWeight +
  //       finalTest * lecture.loBFinalWeight +
  //       practicum * lecture.loBPracticumWeight +
  //       homework * lecture.loBHomeworkWeight;
  //     grade.loC =
  //       midTest * lecture.loCMidWeight +
  //       quiz * lecture.loCQuizWeight +
  //       finalTest * lecture.loCFinalWeight +
  //       practicum * lecture.loCPracticumWeight +
  //       homework * lecture.loCHomeworkWeight;
  //     grade.loD =
  //       midTest * lecture.loDMidWeight +
  //       quiz * lecture.loDQuizWeight +
  //       finalTest * lecture.loDFinalWeight +
  //       practicum * lecture.loDPracticumWeight +
  //       homework * lecture.loDHomeworkWeight;
  //     grade.loE =
  //       midTest * lecture.loEMidWeight +
  //       quiz * lecture.loEQuizWeight +
  //       finalTest * lecture.loEFinalWeight +
  //       practicum * lecture.loEPracticumWeight +
  //       homework * lecture.loEHomeworkWeight;
  //     grade.loF =
  //       midTest * lecture.loFMidWeight +
  //       quiz * lecture.loFQuizWeight +
  //       finalTest * lecture.loFFinalWeight +
  //       practicum * lecture.loFPracticumWeight +
  //       homework * lecture.loFHomeworkWeight;
  //     grade.loG =
  //       midTest * lecture.loGMidWeight +
  //       quiz * lecture.loGQuizWeight +
  //       finalTest * lecture.loGFinalWeight +
  //       practicum * lecture.loGPracticumWeight +
  //       homework * lecture.loGHomeworkWeight;
  //   }
  // }

  public async create(studentGrade: StudentGrade): Promise<StudentGrade> {
    return await this.gradeRepository.save(
      plainToClass(StudentGrade, studentGrade)
    );
  }

  public async createByNim(
    nim: string,
    studentGrade: StudentGrade
  ): Promise<StudentGrade> {
    const student = await Container.get(StudentService).getByNim(nim);
    return await this.gradeRepository.save(
      plainToClass(StudentGrade, {
        studentId: student.id,
        ...studentGrade,
      })
    );
  }

  public async update(
    id: number,
    studentGrade: StudentGrade
  ): Promise<StudentGrade> {
    studentGrade.id = id;
    await this.gradeRepository.update(
      id,
      plainToClass(StudentGrade, studentGrade)
    );
    return this.getOne(id);
  }

  public async updateByNim(
    nim: string,
    studentGrade: StudentGrade
  ): Promise<StudentGrade> {
    const student = await Container.get(StudentService).getByNim(nim);
    await this.gradeRepository.update(
      student.id,
      plainToClass(StudentGrade, { studentId: student.id, ...studentGrade })
    );
    return this.getOne(student.id);
  }

  public async delete(id: number): Promise<void> {
    await this.gradeRepository.delete(id);
    return;
  }
}