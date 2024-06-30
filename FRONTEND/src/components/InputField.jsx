import React from "react";
const InputField = ({handleChange,value,title,name}) => {
    return (<div>
        <label
                style={{
                    display: "block",
                    position: "relative",
                    paddingLeft: "35px",
                    marginBottom: "12px",
                    cursor: "pointer",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    MsUserSelect: "none",
                    userSelect: "none",
                    }}>
                    <input type="radio" name={name}  value={value} onChange={handleChange} />
                    <span style={{
              position: "absolute",
              top: "0",
              left: "0",
              height: "25px",
              width: "25px",
              backgroundColor: "#eee",
            }}></span>{title}
        </label>
        
    </div>)
}
export default InputField;