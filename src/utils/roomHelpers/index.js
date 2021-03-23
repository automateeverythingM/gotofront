import { debounce } from "loadsh";

export const debounceStartTyping = (func, time) => {
  return debounce(func, time, {
    leading: true,
    trailing: false,
  });
};

export const debouncedStopTyping = (func, time) => debounce(func, time);
