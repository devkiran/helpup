import dayjs from "dayjs";

export const formatDate = (date: Date, format = "MMM DD, YYYY") => {
  return dayjs(date).format(format);
};
