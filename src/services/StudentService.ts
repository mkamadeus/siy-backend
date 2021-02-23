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
    return await this.studentRepository.find().then((student) => student);
  }

  /**
   * Get student by database ID
   * @param id ID of the student
   */
  public async getOne(id: number): Promise<Student> {
    return await this.studentRepository
      .findOne({ where: { id } })
      .then((student) => student);
  }

  /**
   * Get student by NIM
   * @param nim NIM of the student
   */
  public async getByNIM(nim: number): Promise<Student[]> {
    return await this.studentRepository
      .find({ where: { nim } })
      .then((student) => student);
  }

  public async getGradeByNIM(nim: number): Promise<Student> {
    return await this.studentRepository
      .createQueryBuilder("student")
      .innerJoinAndSelect("student.studentGrades", "studentGrade")
      .innerJoinAndSelect(
        "studentGrade.course",
        "studentGrades.courseId = courses.id"
      )
      .where("student.nim = :nim", { nim: nim })
      .getOne();
  }

  public async getGradeBySemester(
    nim: number,
    year: number,
    semester: number
  ): Promise<Student> {
    return await this.studentRepository
      .createQueryBuilder("student")
      .innerJoinAndSelect("student.studentGrades", "studentGrade")
      .innerJoinAndSelect(
        "studentGrade.course",
        "studentGrades.courseId = courses.id"
      )
      .where("student.nim = :nim", { nim: nim })
      .andWhere("studentGrade.year = :year", { year: year })
      .andWhere("studentGrade.semester = :sem", { sem: semester })
      .getOne();
  }

  public async getIP(nim: number): Promise<number> {
    const stud = await this.studentRepository
      .createQueryBuilder("student")
      .innerJoinAndSelect("student.studentGrades", "studentGrade")
      .innerJoinAndSelect(
        "studentGrade.course",
        "studentGrades.courseId = courses.id"
      )
      .where("student.nim = :nim", { nim: nim })
      .getRawMany();

    var total = 0;
    var totalsks = 0;
    for (let iter of stud) {
      //console.log("hoi");
      var indeks = parseFloat(IndexValueEnum[iter["studentGrade_indeks"]]);
      var sks = iter["studentGrades.courseId = courses.id_sks"];
      total += indeks * sks;
      totalsks += sks;
      //console.log(indeks);
      //console.log(sks);
      //total += index[iter["studentGrade_indeks"]];
    }
    var ip = total / totalsks;
    //console.log(ip);
    return ip;
  }

  public async getNR(
    nim: number,
    year: number,
    semester: number
  ): Promise<number> {
    const stud = await this.studentRepository
      .createQueryBuilder("student")
      .innerJoinAndSelect("student.studentGrades", "studentGrade")
      .innerJoinAndSelect(
        "studentGrade.course",
        "studentGrades.courseId = courses.id"
      )
      .where("student.nim = :nim", { nim: nim })
      .andWhere("studentGrade.year = :year", { year: year })
      .andWhere("studentGrade.semester = :sem", { sem: semester })
      .getRawMany();

    var total = 0;
    var totalsks = 0;
    for (let iter of stud) {
      //console.log("hoi");
      var indeks = parseFloat(IndexValueEnum[iter["studentGrade_indeks"]]);
      var sks = iter["studentGrades.courseId = courses.id_sks"];
      total += indeks * sks;
      totalsks += sks;
      //console.log(indeks);
      //console.log(sks);
      //total += index[iter["studentGrade_indeks"]];
    }
    var nr = total / totalsks;
    //console.log(ip);
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
   * Delete student by ID
   * @param id Student ID
   */
  public async delete(id: number): Promise<void> {
    await this.studentRepository.delete(id);
    return;
  }
}
