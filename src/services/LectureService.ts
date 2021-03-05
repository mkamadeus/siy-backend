import Lecture from "@/entity/Lecture";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

@Service()
export class LectureService {
  private assignmentRepository: Repository<Lecture> = getRepository(Lecture);

  public async getAll(): Promise<Lecture[]> {
    return await this.assignmentRepository.find().then((cls) => cls);
  }

  public async getOne(id: number): Promise<Lecture> {
    return await this.assignmentRepository
      .findOne({ where: { id } })
      .then((cls) => cls);
  }

  public async create(assignment: Lecture): Promise<Lecture> {
    return await this.assignmentRepository.save(assignment);
  }

  public async update(id: number, assignment: Lecture): Promise<Lecture> {
    assignment.id = id;
    return await this.assignmentRepository.save(assignment);
  }

  public async delete(id: number): Promise<void> {
    await this.assignmentRepository.delete(id);
    return;
  }
}
