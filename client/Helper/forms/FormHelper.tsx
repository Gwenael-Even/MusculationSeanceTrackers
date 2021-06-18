import React, { useState } from 'react'


/**
 * @param callback 
 * @param initialState 
 */
export const FormHelper = (callback: any, initialState = {}) => {
  const [values, setValues] = useState(initialState)

  
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await callback();
  }

  return {
    onChangeText,
    onSubmit,
    values
  }
}