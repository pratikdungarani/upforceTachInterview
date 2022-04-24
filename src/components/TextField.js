import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap';
function TextField({name, value, type, label, handleChange, placeholder, error}) {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input type={type ? type : "text"} name={name}   placeholder={placeholder} onChange={handleChange} autoComplete="off" value={value} />
      {
          error ? error :''
      }
    </FormGroup>
  )
}

export default TextField