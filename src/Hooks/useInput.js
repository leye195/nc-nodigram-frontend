import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setValue((cur) => value);
  };
  return { value, setValue, onChange };
};
