import React from "react";

const useDynamicFields = (fields, setFields, content) => {
  const handleDynamicChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...fields];
    list[index][name] = value;
    setFields(list);
  };

  const removeDynamicField = (index) => {
    setFields(
      fields.filter((field, idx) => {
        return idx !== index;
      })
    );
  };

  const addDynamicField = () => {
    setFields([...fields, content]);
  };

  return { handleDynamicChange, removeDynamicField, addDynamicField };
};

export default useDynamicFields;
