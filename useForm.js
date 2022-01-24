import { useEffect, useState } from "react";

const useForm = (initialState = {}, validate, fn) => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (!submit) return;
    const errorVerify = Object.keys(error).length === 0;
    errorVerify && fn(values);
    setSubmit(false);
    resetForm();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errores = validate(values);
    setError(errores);
    setSubmit(true);
  };

  const resetForm = () => {
    setValues(initialState);
  };

  return [values, error, handleInputChange, handleFormSubmit, resetForm];
};

export default useForm;
