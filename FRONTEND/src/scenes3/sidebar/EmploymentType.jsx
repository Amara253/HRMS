import React from 'react'
import InputField from '../../components/InputField'

const EmploymentType = ({handleChange}) => {
  return (
    <div>
    <h4
      style={{
        marginBottom: "0.5rem",
        fontSize: "1.125rem",
        lineHeight: "1.75rem",
        fontWeight: "500",
      }}
    >
     Type of employment
    </h4>
          <div>
          <InputField handleChange={handleChange} value="" title="Any Experience" name="test" />
      <InputField handleChange={handleChange} value="full-time" title="Full-time" name="test" />
      <InputField handleChange={handleChange} value="part-time" title="Part-time" name="test" />
    </div>
  </div>
  )
}

export default EmploymentType;
