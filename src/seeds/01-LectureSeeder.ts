import Student from "@/entity/Student";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class StudentSeeder implements Seeder {
  public async run(factory: Factory, _connection: Connection): Promise<any> {
    await factory(Student)().createMany(100);
  }
}
