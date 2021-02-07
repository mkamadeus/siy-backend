import Test from "@/entity/Test";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

@Service()
export class TestService {
  private testRepository: Repository<Test> = getRepository(Test);

  public async getAll(): Promise<Test[]> {
    return await this.testRepository.find().then((test) => test);
  }

  public async getOne(id: number): Promise<Test> {
    return await this.testRepository
      .findOne({ where: { id } })
      .then((test) => test);
  }

  public async create(test: Test): Promise<Test> {
    return await this.testRepository.save(test);
  }

  public async update(id: number, test: Test): Promise<Test> {
    test.id = id;
    return await this.testRepository.save(test);
  }

  public async delete(id: number): Promise<void> {
    await this.testRepository.delete(id);
    return;
  }
}
