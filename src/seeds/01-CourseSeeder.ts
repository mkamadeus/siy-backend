import Course from "@/entity/Course";
import { Connection } from "typeorm";
import { Seeder } from "typeorm-seeding";

export default class CourseSeeder implements Seeder {
  public async run(_, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Course)
      .values([
        { code: "IF3110", name: "Pengembangan Aplikasi Berbasis Web" },
        { code: "IF3130", name: "Jaringan Komputer" },
        { code: "IF3140", name: "Manajemen Basis Data" },
        { code: "IF3141", name: "Sistem Informasi" },
        { code: "IF3150", name: "Manajemen Proyek Perangkat Lunak" },
        { code: "IF3151", name: "Interaksi Manusia Komputer" },
        { code: "IF3170", name: "Intelejensi Buatan" },
      ])
      .execute();
  }
}
