import React from "react";
const Button = ({onClickHandler,value,title}) => {
    return (
        <button onClick={onClickHandler} value={value}
            onMouseOver={(e) => {
            e.target.style.backgroundColor = "blue";
            e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
            e.target.style.backgroundColor = ""; // Reset to default background
            e.target.style.color = ""; // Reset to default color
        }}
        style={{paddingTop: "0.25rem",
        paddingBottom: "0.25rem", 
        paddingLeft: "1rem",
            paddingRight: "1rem", 
            background: "transparent",
        border:"#444444",
        borderWidth: "1px", 
        fontSize: "1rem",
        lineHeight: "1.5rem" 
       }}>
           {title}
        
        </button>
    )
}
 export default Button;