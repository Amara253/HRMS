import React from "react";
import Location from "./Location";
import Salary from "./Salary";
import JobPostingDate from "./JobPostingDate";
import WorkExperience from "./WorkExperience";
import EmploymentType from "./EmploymentType";


const Sidebar = ({ handleChange, handleClick }) => {
    return (
        <div style={{ marginTop: "1.25rem" }}>
            <h3 style={{
                marginBottom: "0.5rem",
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
                fontWeight: 700,
            }}>Filters</h3>
            <Location handleChange={handleChange} />
            <Salary handleChange={handleChange} handleClick={handleClick} />
            <JobPostingDate handleChange={handleChange} />
            <WorkExperience handleChange={handleChange} />
            <EmploymentType handleChange={handleChange}/>
        </div>
    );
};

export default Sidebar;
