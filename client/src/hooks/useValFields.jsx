import { useMemo } from "react";

export const useValFields = (errors, name, index) => {
  return useMemo(() => {
    return errors.some((el) => {
      if (index) {
        return el.index === index && el.type === name;
      } else {
        return el.type === name;
      }
    });
  }, [errors]);
};

export const useValMultiFields = (errors, index, name, mainIndex) => {
  return useMemo(() => {
    return errors.some((el) => {
      if (mainIndex) {
        return (
          el.index === index && el.type === name && el.mainIndex === mainIndex
        );
      } else {
        return el.index === index && el.type === name;
      }
    });
  }, [errors]);
};
