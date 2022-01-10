import { useContext, useState } from 'react';

export default function useForm(initialState: any) {
  //
  const [inputValues, setInputValue] = useState(initialState);

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setInputValue({ ...inputValues, [name]: value });
  }

  return {
    inputValues,
    setInputValue,
    handleInputChange,
  };
}
