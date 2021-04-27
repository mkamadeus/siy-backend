import Student from "@/entity/Student";
import Container, { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

@Service()
export class StudentService {
  private studentRepository: Repository<Student> = getRepository(
    Student,
    process.env.NODE_ENV === "test" ? "test" : "default"
  );

  /**
   * Get all students from database.
   */
  public async getAll(): Promise<Student[]> {
    return await this.studentRepository.find().then((cls) => cls);

    // return await this.studentRepository
    //   .createQueryBuilder("student")
    //   // .leftJoinAndSelect("student.studentGrades", "studentGrade")
    //   // .leftJoinAndSelect(
    //   //   "studentGrade.lecture",
    //   //   "studentGrades.lectureId = lectures.id"
    //   // )
    //   .getMany();
  }

  /**
   * Get student by database ID
   * @param id ID of the student
   */
  public async getOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });
    return student;
  }

  public async getByUserId(userId: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { userId } });
    return student;
  }

  /**
   * Get student by NIM
   * @param nim NIM of the student
   */
  public async getByNim(nim: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { nim },
    });
    return student;
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
    await this.studentRepository.update(id, student);
    var tes = await Container.get(StudentService).getOne(id);
    // console.log(tes);
    return tes;
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
