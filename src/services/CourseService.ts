import Course from "@/entity/Course";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

@Service()
export class CourseService {
  private courseRepository: Repository<Course> = getRepository(Course);

  public async getAll(): Promise<Course[]> {
    return await this.courseRepository.find().then((course) => course);
  }

  public async getOne(id: number): Promise<Course> {
    return await this.courseRepository
      .findOne({ where: { id } })
      .then((course) => course);
  }

  public async create(course: Course): Promise<Course> {
    return await this.courseRepository.save(course);
  }

  public async update(id: number, course: Course): Promise<Course> {
    course.id = id;
    await this.courseRepository.update(id, course);
    return await this.getOne(id);
  }

  public async delete(id: number): Promise<void> {
    await this.courseRepository.delete(id);
    return;
  }
}
