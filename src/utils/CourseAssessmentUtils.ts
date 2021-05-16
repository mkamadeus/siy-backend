export const calculateCourseAssessment = (
  courseOutcome: number,
  quesionnaire: number,
  portfolio: number
): number => {
  return 0.5 * courseOutcome + 0.4 * quesionnaire + 0.1 * portfolio;
};
