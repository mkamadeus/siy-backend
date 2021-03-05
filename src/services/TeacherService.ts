import Teacher from "@/entity/Teacher";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

@Service()
export class TeacherService {
  private testRepository: Repository<Teacher> = getRepository(Teacher);

  public async getAll(): Promise<Teacher[]> {
    return await this.testRepository.find().then((test) => test);
  }

  public async getOne(id: number): Promise<Teacher> {
    return await this.testRepository
      .findOne({ where: { id } })
      .then((test) => test);
  }

  public async create(test: Teacher): Promise<Teacher> {
    return await this.testRepository.save(test);
  }

  public async update(id: number, test: Teacher): Promise<Teacher> {
    test.id = id;
    return await this.testRepository.save(test);
  }

  public async delete(id: number): Promise<void> {
    await this.testRepository.delete(id);
    return;
  }
}
