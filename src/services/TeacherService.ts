import Teacher from "@/entity/Teacher";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

@Service()
export class TeacherService {
  private teacherRepository: Repository<Teacher> = getRepository(Teacher);

  /**
   * Get all teachers from database.
   */
  public async getAll(): Promise<Teacher[]> {
    return await this.teacherRepository.find().then((teacher) => teacher);
  }

  /**
   * Get one teacher by id.
   * @param {number} id The teacher ID queried.
   */
  public async getOne(id: number): Promise<Teacher> {
    return await this.teacherRepository
      .findOne({ where: { id } })
      .then((teacher) => teacher);
  }

  /**
   * Create new teacher entry in the database.
   * @param {Teacher} teacher The teacher ID queried.
   */
  public async create(teacher: Teacher): Promise<Teacher> {
    return await this.teacherRepository.save(teacher);
  }

  /**
   * Update existing teacher entry in database.
   * @param id The teacher ID queried.
   * @param teacher The teacher body for updating entries.
   */
  public async update(id: number, teacher: Teacher): Promise<Teacher> {
    teacher.id = id;
    await this.teacherRepository.update(id, teacher);
    return await this.getOne(id);
  }

  /**
   * Delete existing teacher entry from the database.
   * @param id The teacher ID queried.
   */
  public async delete(id: number): Promise<void> {
    await this.teacherRepository.delete(id);
    return;
  }
}
