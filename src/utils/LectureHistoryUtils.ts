import { AcademicYear, LectureHistory } from '@/models/LectureHistory';

export const getMinAcademicYear = (history: LectureHistory[]): AcademicYear => {
  const minHistory = history.reduce((cur, h) => {
    if (cur.lecture.year < h.lecture.year) {
      return h;
    } else if (cur.lecture.year === h.lecture.year) {
      if (cur.lecture.semester < h.lecture.semester) return h;
      return cur;
    } else return cur;
  });
  return {
    year: minHistory.lecture.year,
    semester: minHistory.lecture.semester,
  };
};

export const getMaxAcademicYear = (history: LectureHistory[]): AcademicYear => {
  const maxHistory = history.reduce((cur, h) => {
    if (cur.lecture.year > h.lecture.year) {
      return h;
    } else if (cur.lecture.year === h.lecture.year) {
      if (cur.lecture.semester > h.lecture.semester) return h;
      return cur;
    } else return cur;
  });
  return {
    year: maxHistory.lecture.year,
    semester: maxHistory.lecture.semester,
  };
};

export const getAcademicYear = (history: LectureHistory): AcademicYear => {
  return {
    year: history.lecture.year,
    semester: history.lecture.semester,
  };
};

export const isAcademicYearBetween = (
  year: AcademicYear,
  minYear: AcademicYear,
  maxYear: AcademicYear
): boolean => {
  return (
    (year.year > minYear.year && year.year < maxYear.year) ||
    (year.year === minYear.year && year.semester >= minYear.semester) ||
    (year.year === maxYear.year && year.semester <= maxYear.semester)
  );
};

export const incrementAcademicYear = (year: AcademicYear): AcademicYear => {
  if (year.semester === 2) {
    year.semester = 1;
    year.year++;
  } else {
    year.semester++;
  }
  return year;
};
