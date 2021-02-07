import Assignment, { AssignmentType } from "@/entity/Assignment";
import { Connection } from "typeorm";
import { Seeder } from "typeorm-seeding";

export default class AssignmentSeeder implements Seeder {
  public async run(_, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Assignment)
      .values([
        {
          title: "Minesweeper AI",
          courseId: 7,
          deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 1000),
          type: AssignmentType.TUBES,
        },
        {
          title: "Audio Streamer",
          courseId: 2,
          deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 1000),
          type: AssignmentType.TUBES,
        },
        {
          title: "Security & Access Control",
          courseId: 3,
          deadline: new Date(new Date().getTime() + 15 * 24 * 60 * 1000),
          type: AssignmentType.TUCIL,
        },
      ])
      .execute();
  }
}
