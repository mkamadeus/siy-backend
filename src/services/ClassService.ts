import Class from "@/entity/Class";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

@Service()
export class ClassService {
  private assignmentRepository: Repository<Class> = getRepository(Class);

  public async getAll(): Promise<Class[]> {
    return await this.assignmentRepository.find().then((cls) => cls);
  }

  public async getOne(id: number): Promise<Class> {
    return await this.assignmentRepository
      .findOne({ where: { id } })
      .then((cls) => cls);
  }

  public async create(assignment: Class): Promise<Class> {
    return await this.assignmentRepository.save(assignment);
  }

  public async update(id: number, assignment: Class): Promise<Class> {
    assignment.id = id;
    return await this.assignmentRepository.save(assignment);
  }

  public async delete(id: number): Promise<void> {
    await this.assignmentRepository.delete(id);
    return;
  }
}
