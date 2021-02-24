import multer from "multer";
import { Service } from "typedi";

export const fileUploadOptions = (): multer.Options => {
  return {
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, "./uploads");
      },
      filename: (_req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.xlsx`);
      },
    }),
    fileFilter: (_req, file, cb) => {
      if (
        file.mimetype !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        cb(new Error("Wrong file type"));
        return;
      }
      cb(null, true);
    },
  };
};

@Service()
export class UploadService {}
