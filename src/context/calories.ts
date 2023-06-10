import { createContext } from "react";

export const Calories = createContext<{ max: number; value: number }>({
  max: 0,
  value: 0,
});
