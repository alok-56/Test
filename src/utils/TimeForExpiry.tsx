export const getCurrentDate12HoursFormat = (): string => {
  const currentDate = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );

  // Manually convert "AM" or "PM" to lowercase
  return formattedDate.replace(/([APMapm]{2})/, (match) => match.toLowerCase());
};
