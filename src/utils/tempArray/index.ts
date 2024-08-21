import { ITempResponse } from "../types/temperature";

export const createTempArray = (data: ITempResponse) => {
  return data?.list.map((tempItem, index) => ({
    hour: index + 1 < 13 ? `${index + 1}AM` : `${index + 1 - 12}PM`,
    temp: tempItem.main.temp,
  }));
};
