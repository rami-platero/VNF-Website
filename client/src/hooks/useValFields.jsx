export const useValFields = (errors, name, index ) => {
  return errors.some((el) => {
    if(index){
      return el.index === index && el.type === name;
    } else {
      return el.type === name;
    }
  });
};

export const useValMultiFields = (errors, index, name, mainIndex) => {
  return errors.some((el) => {
    if (mainIndex) {
      return (
        el.index === index && el.type === name && el.mainIndex === mainIndex
      );
    } else {
      return (
        el.index === index && el.type === name
      );
    }
  });
};
