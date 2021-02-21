import Student from "@/entity/Student";
import Course from "@/entity/Course";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { table } from "console";

enum index {
  A = 4,
  AB = 3.5,
  B = 3,
  BC = 2.5,
  C = 2,
  D = 1,
  E = 0,
}

@Service()
export class StudentService {
  private studentRepository: Repository<Student> = getRepository(Student);
  private courseRepository: Repository<Course> = getRepository(Course);

  public async getAll(): Promise<Student[]> {
    return await this.studentRepository.find().then((student) => student);
  }

  public async getOne(id: number): Promise<Student> {
    return await this.studentRepository
      .findOne({ where: { id } })
      .then((student) => student);
  }

  public async getByNIM(id: number): Promise<Student[]> {
    return await this.studentRepository
      .find({ where: { nim: id } })
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

  public async getGradeThisSemester(
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
      var indeks = parseFloat(index[iter["studentGrade_indeks"]]);
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
      var indeks = parseFloat(index[iter["studentGrade_indeks"]]);
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

  public async create(student: Student): Promise<Student> {
    return await this.studentRepository.save(student);
  }

  public async update(id: number, student: Student): Promise<Student> {
    student.id = id;
    return await this.studentRepository.save(student);
  }

  public async delete(id: number): Promise<void> {
    await this.studentRepository.delete(id);
    return;
  }
}
