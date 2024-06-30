import React from "react";
import Button from "./Button";
import InputField from "../../components/InputField";

const Salary = ({ handleChange, handleClick }) => {
    return (
        <div>
            <h4 style={{
                marginBottom: "0.5rem",
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
                fontWeight: "500"
            }}> Salary</h4>
            <div style={{marginBottom: "1rem" }}>
                <Button onClickHandler={handleClick} value="" title="Hourly" />
                <Button onClickHandler={handleClick} value="Monthly" title="Monthly" />
                <Button onClickHandler={handleClick} value="Yearly" title="Yearly" />
            </div>

            <div>
          
                <InputField handleChange={handleChange} value="" title="All" name="test2" />
                <InputField handleChange={handleChange} value={30} title="< 30,000Rs" name="test2" />
                <InputField handleChange={handleChange} value={50} title="< 50,000Rs" name="test2" />
                <InputField handleChange={handleChange} value={80} title="< 80,000Rs" name="test2" />
                <InputField handleChange={handleChange} value={100} title="< 100,000Rs" name="test2" />
            </div>
        </div>
    )
};

export default Salary;
