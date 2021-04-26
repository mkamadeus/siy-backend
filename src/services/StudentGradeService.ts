import StudentGrade from "@/entity/StudentGrade";
import { IndexValueEnum } from "@/enum/IndexEnum";
import { LoEntry, LoOwner } from "@/enum/LoEnum";
import { plainToClass } from "class-transformer";
import Container, { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { CourseService } from "./CourseService";
import { LectureService } from "./LectureService";
import { StudentService } from "./StudentService";
import { UploadService } from "./UploadService";

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

  public async getByLectureId(lectureId: number) {
    return await this.gradeRepository
      .find({ where: { lectureId } })
      .then((studentGrades) => studentGrades);
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

  public async getLo(grade: StudentGrade) {
    const totalLo: LoEntry = {
      loA: 0,
      loB: 0,
      loC: 0,
      loD: 0,
      loE: 0,
      loF: 0,
      loG: 0,
    };
    console.log("getLo");
    console.log(grade);

    const lecture = await Container.get(LectureService).getOne(grade.lectureId);
    console.log(lecture);
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
      loATotalWeight > 0
        ? ((grade.midTest * lecture.loAMidWeight +
            grade.quiz * lecture.loAQuizWeight +
            grade.finalTest * lecture.loAFinalWeight +
            grade.practicum * lecture.loAPracticumWeight +
            grade.homework * lecture.loAHomeworkWeight) *
            4) /
          (loATotalWeight * 100)
        : 0;
    totalLo.loB =
      loBTotalWeight > 0
        ? ((grade.midTest * lecture.loBMidWeight +
            grade.quiz * lecture.loBQuizWeight +
            grade.finalTest * lecture.loBFinalWeight +
            grade.practicum * lecture.loBPracticumWeight +
            grade.homework * lecture.loBHomeworkWeight) *
            4) /
          (loBTotalWeight * 100)
        : 0;
    totalLo.loC =
      loCTotalWeight > 0
        ? ((grade.midTest * lecture.loCMidWeight +
            grade.quiz * lecture.loCQuizWeight +
            grade.finalTest * lecture.loCFinalWeight +
            grade.practicum * lecture.loCPracticumWeight +
            grade.homework * lecture.loCHomeworkWeight) *
            4) /
          (loCTotalWeight * 100)
        : 0;
    totalLo.loD =
      loDTotalWeight > 0
        ? ((grade.midTest * lecture.loDMidWeight +
            grade.quiz * lecture.loDQuizWeight +
            grade.finalTest * lecture.loDFinalWeight +
            grade.practicum * lecture.loDPracticumWeight +
            grade.homework * lecture.loDHomeworkWeight) *
            4) /
          (loDTotalWeight * 100)
        : 0;
    totalLo.loE =
      loETotalWeight > 0
        ? ((grade.midTest * lecture.loEMidWeight +
            grade.quiz * lecture.loEQuizWeight +
            grade.finalTest * lecture.loEFinalWeight +
            grade.practicum * lecture.loEPracticumWeight +
            grade.homework * lecture.loEHomeworkWeight) *
            4) /
          (loETotalWeight * 100)
        : 0;
    totalLo.loF =
      loFTotalWeight > 0
        ? ((grade.midTest * lecture.loFMidWeight +
            grade.quiz * lecture.loFQuizWeight +
            grade.finalTest * lecture.loFFinalWeight +
            grade.practicum * lecture.loFPracticumWeight +
            grade.homework * lecture.loFHomeworkWeight) *
            4) /
          (loFTotalWeight * 100)
        : 0;
    totalLo.loG =
      loGTotalWeight > 0
        ? ((grade.midTest * lecture.loGMidWeight +
            grade.quiz * lecture.loGQuizWeight +
            grade.finalTest * lecture.loGFinalWeight +
            grade.practicum * lecture.loGPracticumWeight +
            grade.homework * lecture.loGHomeworkWeight) *
            4) /
          (loGTotalWeight * 100)
        : 0;
    console.log(totalLo);

    grade.loA = totalLo.loA;
    grade.loB = totalLo.loB;
    grade.loC = totalLo.loC;
    grade.loD = totalLo.loD;
    grade.loE = totalLo.loE;
    grade.loF = totalLo.loF;
    grade.loG = totalLo.loG;

    await this.gradeRepository.update(grade.id, grade);
    console.log(grade);
    return totalLo;
  }

  /**
   * Get LO by grade entry
   * @param id Grade ID
   * @returns LO after being calculated
   */
  public async getLoById(id: number) {
    const grade = await this.getOne(id);
    return await this.getLo(grade);
  }

  public async getLoByLectureId(lectureId: number) {
    const grades = await this.getByLectureId(lectureId);
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
    const grades = await this.getByNim(nim);

    return await this.getCumulativeSum(grades);
  }

  public async getLOPerSemester(nim: string, year: number, semester: number) {
    const grades = await this.getByNimPerSemester(nim, year, semester);

    return await this.getCumulativeSum(grades);
  }

  public async getCumulativeSum(grades: StudentGrade[]) {
    let cumulativeSum: LoEntry = {
      loA: 0,
      loB: 0,
      loC: 0,
      loD: 0,
      loE: 0,
      loF: 0,
      loG: 0,
    };

    let totalWeight: LoEntry = {
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
      console.log("loList");
      console.log(loList);
      console.log("kmtList");
      console.log(kmtList);
      if (cumulativeSum) {
        for (let key in cumulativeSum) {
          cumulativeSum[key] += loList[key] * kmtList[key];
          totalWeight[key] += kmtList[key];
        }
      } else {
        cumulativeSum = loList;
      }
    }
    console.log("cumulativeSum");
    console.log(cumulativeSum);
    console.log("totalWeight");
    console.log(totalWeight);

    for (let key in cumulativeSum) {
      if (totalWeight[key] == 0) {
        cumulativeSum[key] = 0;
      } else {
        cumulativeSum[key] /= totalWeight[key];
      }
    }
    console.log("Cumulative Sum");
    console.log(cumulativeSum);

    return cumulativeSum;
  }

  public async create(studentGrade: StudentGrade): Promise<StudentGrade> {
    var result = await this.gradeRepository.save(studentGrade);
    return this.updateLO(result);
  }

  public async createByNim(
    nim: string,
    studentGrade: StudentGrade
  ): Promise<StudentGrade> {
    try {
      const student = await Container.get(StudentService).getByNim(nim);
      const result = await this.gradeRepository.save(
        plainToClass(StudentGrade, {
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
      throw new Error("Array length must be the same!");

    const errorArray = [];
    for (let i = 0; i < nimArray.length; i++) {
      try {
        const body = {
          lectureId,
          year,
          semester,
          ...gradeArray[i],
        };
        // console.log(body);
        await this.createByNim(nimArray[i], body as StudentGrade);
      } catch (err) {
        errorArray.push((err as Error).message);
      }
    }

    return { errors: errorArray };
  }

  public async update(
    id: number,
    studentGrade: Partial<StudentGrade>
  ): Promise<StudentGrade> {
    studentGrade.id = id;
    // await this.gradeRepository.update(
    //   studentGrade.id,
    //   plainToClass(StudentGrade, { id: studentGrade.id, ...studentGrade })
    // );
    await this.gradeRepository.save(plainToClass(StudentGrade, studentGrade));
    const grade = await this.getOne(id);
    // console.log(grade);
    return await this.updateLO(grade);
  }

  public async updateLO(grade: StudentGrade): Promise<StudentGrade> {
    // update LO
    console.log("updateCumulativeLO");
    // const grade = await Container.get(StudentGradeService).getOne(this.id);
    const student = await Container.get(StudentService).getOne(grade.studentId);
    const lo = await Container.get(StudentGradeService).getCumulativeLoByNim(
      student.nim
    );
    console.log("lo");
    console.log(lo);
    console.log(student.id);

    await Container.get(StudentService).update(student.id, { ...lo });

    return this.getOne(grade.id);
  }

  public async updateByNim(
    nim: string,
    studentGrade: StudentGrade
  ): Promise<StudentGrade> {
    console.log("sebelum get student");
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
