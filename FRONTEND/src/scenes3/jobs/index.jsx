import React from "react";

const Jobs = ({result}) => {
    return (
        <>
            <div>
            <h3 style={{marginBottom:"0.5rem",fontSize:"1.125rem",lineHeight:"1.75rem",fontWeight:"700"}}>{result.length} Jobs</h3>
            </div>
            <section>{result}</section></>
    );
};
export default Jobs;