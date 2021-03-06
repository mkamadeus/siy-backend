import StudentGrade from "@/entity/StudentGrade";
import { deserialize, plainToClass } from "class-transformer";
import Container, { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
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

  public async create(studentGrade: StudentGrade): Promise<StudentGrade> {
    return await this.gradeRepository.save(studentGrade);
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
    student: StudentGrade
  ): Promise<StudentGrade> {
    student.id = id;
    return await this.gradeRepository.save(student);
  }

  public async delete(id: number): Promise<void> {
    await this.gradeRepository.delete(id);
    return;
  }
}
