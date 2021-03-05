import StudentGrade from "@/entity/StudentGrade";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

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

  public async getByStdID(stdID: number): Promise<StudentGrade[]> {
    return await this.gradeRepository
      .find({ where: { studentId: stdID } })
      .then((studentGrade) => studentGrade);
  }

  public async create(student: StudentGrade): Promise<StudentGrade> {
    return await this.gradeRepository.save(student);
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
