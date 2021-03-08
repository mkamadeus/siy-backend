import multer from "multer";
import { Service } from "typedi";
import { CellValue, Workbook } from "exceljs";
import path from "path";

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
export class UploadService {
  /**
   * Parse Excel file from path in the `uploads` folder
   * @param filePath Path relative to the `uploads` folder
   */
  public async parseExcel(filePath: string): Promise<CellValue[][]> {
    const workbook = new Workbook();
    const absolutePath = path.join(__dirname, "../../uploads", filePath);
    await workbook.xlsx.readFile(absolutePath);
    const worksheet = workbook.getWorksheet(1);
    const result: CellValue[][] = [];
    for (let i = 0; i < worksheet.rowCount; i++) {
      const row: CellValue[] = [];
      for (let j = 0; j < worksheet.columnCount; j++) {
        row.push(worksheet.getRow(i + 1).getCell(j + 1).value);
      }
      result.push(row);
    }
    return result;
  }
}
