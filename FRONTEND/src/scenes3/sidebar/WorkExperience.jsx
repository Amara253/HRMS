import React from 'react';
import InputField from '../../components/InputField';

const WorkExperience = ({handleChange}) => {
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
      Work Experience
    </h4>
    <div>
      <InputField handleChange={handleChange} value="" title="Any Experience" name="test" />
      <InputField handleChange={handleChange} value="Internship" title="Internship" name="test" />
      <InputField handleChange={handleChange} value="work remotely" title="Work remotely" name="test" />
    </div>
  </div>
  )
}

export default WorkExperience;
