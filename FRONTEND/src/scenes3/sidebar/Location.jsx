import React from "react";
import InputField from "../../components/InputField";

const Location = ({ handleChange }) => {
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
        Location
      </h4>
      <div>
        <InputField handleChange={handleChange} value="" title="All" name="location" />
        <InputField handleChange={handleChange} value="Islamabad" title="Islamabad" name="location" />
        <InputField handleChange={handleChange} value="Rawalpindi" title="Rawalpindi" name="location" />
        <InputField handleChange={handleChange} value="Lahore" title="Lahore" name="location" />
        <InputField handleChange={handleChange} value="Karachi" title="Karachi" name="location" />
      </div>
    </div>
  );
};

export default Location;
