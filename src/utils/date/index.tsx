export const formatDate = (): string => {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    weekday: "short",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
};
