import LOSupplement from "@/entity/LOSupplement";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

@Service()
export default class LOSupplementService {
  private loSupplementRepository: Repository<LOSupplement> = getRepository(
    LOSupplement
  );

  public async getAll(): Promise<LOSupplement[]> {
    return await this.loSupplementRepository
      .find()
      .then((loSupplements) => loSupplements);
  }

  public async getOne(id: number): Promise<LOSupplement> {
    return await this.loSupplementRepository
      .findOne({ where: { id } })
      .then((loSupplement) => loSupplement);
  }

  public async getByStudentId(studentId: number): Promise<LOSupplement> {
    return await this.loSupplementRepository
      .findOne({ where: { studentId } })
      .then((loSupplement) => loSupplement);
  }

  public async create(loSupplement: LOSupplement): Promise<LOSupplement> {
    const lo = await this.loSupplementRepository.save(loSupplement);
    return await this.getOne(lo.id);
  }

  public async update(
    id: number,
    loSupplement: LOSupplement
  ): Promise<LOSupplement> {
    loSupplement.id = id;
    const lo = await this.loSupplementRepository.save(loSupplement);
    return await this.getOne(lo.id);
  }

  public async delete(id: number): Promise<void> {
    await this.loSupplementRepository.delete(id);
    return;
  }
}
