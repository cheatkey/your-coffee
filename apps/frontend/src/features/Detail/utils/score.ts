export const getScoreColor = (score?: number | null) => {
  if (!score) return "";
  if (score >= 90) return "bg-green-500";
  if (score >= 80) return "bg-blue-500";
  if (score >= 70) return "bg-yellow-500";
  return "bg-red-500";
};
