import React from 'react'

function TextField({name, value, type, label, handleChange, placeholder, error}) {
  return (
    <div className='field_row'>
        <label htmlFor="">{label}</label>
        <div className="field_input">
            <input type={type ? type : "text"}  name={name} placeholder={placeholder} onChange={handleChange} autoComplete="off" value={value}  />
        </div>
        {
          error ? error :''
        }
    </div>
  )
}

export default TextField