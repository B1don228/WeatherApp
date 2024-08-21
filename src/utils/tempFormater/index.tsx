export const valueFormatter = (value: number | null): string => {
  if (value === null) return "N/A";
  return `${value}°F`;
};
