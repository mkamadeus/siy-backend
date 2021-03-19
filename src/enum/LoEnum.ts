export interface LoEntry {
  loA: number;
  loB: number;
  loC: number;
  loD: number;
  loE: number;
  loF: number;
  loG: number;
}

export interface LoOwner {
  gradeId: number;
  los: LoEntry;
}
