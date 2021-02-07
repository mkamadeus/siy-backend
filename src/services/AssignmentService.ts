import Assignment from "@/entity/Assignment";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

@Service()
export class AssignmentService {
  private assignmentRepository: Repository<Assignment> = getRepository(
    Assignment
  );

  public async getAll(): Promise<Assignment[]> {
    return await this.assignmentRepository
      .find({ relations: ["course"] })
      .then((ass) => ass);
  }

  public async getOne(id: number): Promise<Assignment> {
    return await this.assignmentRepository
      .findOne({ where: { id }, relations: ["course"] })
      .then((ass) => ass);
  }

  public async getByClass(classId: number) {
    return await this.assignmentRepository
      .find({ relations: ["course"] })
      .then((assArray) => {
        return assArray.filter((ass) =>
          ass.classes.some((a) => a.id == classId)
        );
      });
  }

  public async create(assignment: Assignment): Promise<Assignment> {
    const ass = await this.assignmentRepository.save(assignment);
    return await this.getOne(ass.id);
  }

  public async update(id: number, assignment: Assignment): Promise<Assignment> {
    assignment.id = id;
    const ass = await this.assignmentRepository.save(assignment);
    return await this.getOne(ass.id);
  }

  public async delete(id: number): Promise<void> {
    await this.assignmentRepository.delete(id);
    return;
  }
}
