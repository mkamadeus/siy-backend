import Student from "@/entity/Student";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { IndexValueEnum } from "@/enum/IndexEnum";

@Service()
export class StudentService {
  private studentRepository: Repository<Student> = getRepository(Student);

  /**
   * Get all students from database.
   */
  public async getAll(): Promise<Student[]> {
    return await this.studentRepository
      .createQueryBuilder("student")
      .innerJoinAndSelect("student.studentGrades", "studentGrade")
      .innerJoinAndSelect(
        "studentGrade.lecture",
        "studentGrades.lectureId = lectures.id"
      )
      .getMany();
  }

  /**
   * Get student by database ID
   * @param id ID of the student
   */
  public async getOne(id: number): Promise<Student> {
    return await this.studentRepository
      .createQueryBuilder("student")
      .innerJoinAndSelect("student.studentGrades", "studentGrade")
      .innerJoinAndSelect(
        "studentGrade.lecture",
        "studentGrades.lectureId = lectures.id"
      )
      .where("student.id = :id", { id })
      .getOne();
  }

  /**
   * Get student by NIM
   * @param nim NIM of the student
   */
  public async getByNim(nim: string): Promise<Student> {
    return await this.studentRepository
      .createQueryBuilder("student")
      .innerJoinAndSelect("student.studentGrades", "studentGrade")
      .innerJoinAndSelect(
        "studentGrade.lecture",
        "studentGrades.lectureId = lectures.id"
      )
      .where("student.nim = :nim", { nim: nim })
      .getOne();
  }

  /**
   * Get grade by semester
   * @param nim NIM of the student
   * @param year Year queried
   */
  public async getGradesByYear(nim: number, year: number): Promise<Student> {
    return await this.studentRepository
      .createQueryBuilder("student")
      .innerJoinAndSelect("student.studentGrades", "studentGrade")
      .innerJoinAndSelect(
        "studentGrade.lecture",
        "studentGrades.lectureId = lectures.id"
      )
      .where("student.nim = :nim", { nim })
      .andWhere("studentGrade.year = :year", { year })
      .getOne();
  }

  /**
   * Get grades by semester
   * @param nim NIM of the student
   * @param year Year queried
   * @param semester Semester queried
   */
  public async getGradesBySemester(
    nim: number,
    year: number,
    semester: number
  ): Promise<Student> {
    return await this.studentRepository
      .createQueryBuilder("student")
      .innerJoinAndSelect("student.studentGrades", "studentGrade")
      .innerJoinAndSelect(
        "studentGrade.lecture",
        "studentGrades.lectureId = lectures.id"
      )
      .where("student.nim = :nim", { nim })
      .andWhere("studentGrade.year = :year", { year })
      .andWhere("studentGrade.semester = :semester", { semester })
      .getOne();
  }

  /**
   * Get the IPK of student by NIM
   * @param nim NIM of the student
   */
  public async getIpkByNim(nim: number): Promise<number> {
    const stud = await this.studentRepository
      .createQueryBuilder("student")
      .innerJoinAndSelect("student.studentGrades", "studentGrade")
      .innerJoinAndSelect(
        "studentGrade.lecture",
        "studentGrades.lectureId = lectures.id"
      )
      .where("student.nim = :nim", { nim: nim })
      .getRawMany();

    var total = 0;
    var totalsks = 0;
    for (let iter of stud) {
      var indeks = parseFloat(IndexValueEnum[iter["studentGrade_indeks"]]);
      var sks = iter["studentGrades.lectureId = lectures.id_sks"];
      total += indeks * sks;
      totalsks += sks;
    }
    var ip = total / totalsks;
    return ip;
  }

  /**
   * Get the IP of the student by NIM
   * @param nim NIM of the student
   * @param year The academic year queried
   * @param semester The semester queried
   */
  public async getIpByNim(
    nim: number,
    year: number,
    semester: number
  ): Promise<number> {
    const stud = await this.studentRepository
      .createQueryBuilder("student")
      .innerJoinAndSelect("student.studentGrades", "studentGrade")
      .innerJoinAndSelect(
        "studentGrade.lecture",
        "studentGrades.lectureId = lectures.id"
      )
      .where("student.nim = :nim", { nim: nim })
      .andWhere("studentGrade.year = :year", { year: year })
      .andWhere("studentGrade.semester = :sem", { sem: semester })
      .getRawMany();

    var total = 0;
    var totalsks = 0;
    for (let iter of stud) {
      var indeks = parseFloat(IndexValueEnum[iter["studentGrade_indeks"]]);
      var sks = iter["studentGrades.lectureId = lectures.id_sks"];
      total += indeks * sks;
      totalsks += sks;
    }
    var nr = total / totalsks;
    return nr;
  }

  /**
   * Create new student
   * @param student Student object that is going to be created
   */
  public async create(student: Student): Promise<Student> {
    return await this.studentRepository.save(student);
  }

  /**
   * Update student by ID
   * @param id Student ID in database
   * @param student Student object that is going to be updated
   */
  public async update(id: number, student: Partial<Student>): Promise<Student> {
    student.id = id;
    return await this.studentRepository.save(student);
  }

  /**
   * Update student by NIM
   * @param nim Student NIM in database
   * @param student Student object that is going to be updated
   */
  public async updateByNim(
    nim: string,
    student: Partial<Student>
  ): Promise<Student> {
    student.nim = nim;
    return await this.studentRepository.save(student);
  }

  /**
   * Delete student by ID
   * @param id Student ID
   */
  public async delete(id: number): Promise<void> {
    await this.studentRepository.delete(id);
    return;
  }
}
