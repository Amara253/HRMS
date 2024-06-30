import React from "react";
import { Link } from "react-router-dom";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const Card = ({ data }) => {
    const {_id, companyName, jobTitle,companyLogo, minPrice, maxPrice, salaryType, jobLocation, employmentType, description,postingDate } = data;
    return (
        <section style={{
            margin: "20px",
            border: "2px solid #ededed",
            padding: "20px",
            cursor: "pointer",
        }}>
            <Link to={`/get_job/${_id}`} style={{
                display: "flex",
                gap: "1rem",
                textDecoration: "none", // Remove underline
                color: "#464646", 
            }}>
                <img src={companyLogo} alt="" style={{ width: "80px", height: "80px" }} />
                <div>
                    <h4 style={{ marginBottom: "0.5rem" }}>{companyName}</h4>
                    <h3 style={{
                        marginBottom: "0.5rem",
                        fontSize: "1.125rem",
                        lineHeight: "1.75rem",
                        fontWeight: 600,
                    }}>{jobTitle}</h3>

                    <div style={{
                        display: "flex",
                        gap: "0.3rem",
                        alignItems: "center",
                    }}>
                        <span style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                        }}> <PlaceOutlinedIcon />{jobLocation}</span>
                        <span style={{
                             
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                        }}> <QueryBuilderOutlinedIcon />{employmentType}</span>
                         <span style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                        }}> <CurrencyRupeeOutlinedIcon />{minPrice}-{maxPrice}</span>
                         <span style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                    }}> <CalendarMonthOutlinedIcon/>{postingDate}</span>

                    </div>
                    <p style={{
                        color: "#464646",
                        fontSize: "1rem",
                    lineHeight:"1.5rem"}}>{description}</p>
                </div>
            </Link>
        </section>
        
        
    );
};

export default Card;
