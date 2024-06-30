import React, { useContext } from "react";
import {Typography, Box } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@mui/system";
import Navbar from "../navbar";
import Banner from "../banner";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Card from "../../components/Card";
import { useEffect } from "react";
import Jobs from "../jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../newsletter/Newsletter";
import CreateJob from "../../scenes/postjob";
import axiosInstance from "../../utilis/ApiRequest";


const Home = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [query, setQuery] = useState("");
    const handleInputChange = (event) => {
        setQuery(event.target.value)
        console.log(event.target.value)
    }
    console.log(query)
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const handleJobSubmitted = () => {
        // Fetch data again after a new job is posted
        fetchData();
    };

    //load data 
    useEffect(() => {
        // Initial data fetch
        fetchData();
    
        // Set interval to fetch data every 5 minutes (adjust as needed)
        const intervalId = setInterval(() => {
            fetchData();
        }, 300000); // 5 minutes in milliseconds
    
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    
    const fetchData = () => {
        setIsLoading(true);
        axiosInstance.get("/get_jobs")
          .then(response => {
            setJobs(response.data);
            setIsLoading(false);
          })
          .catch(error => {
            console.error("Error fetching data:", error.message);
            setIsLoading(false);
          });
      };
      
    //console.log(jobs)
    //filter jobs using title
    const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);

    const handleChange = (event) => {
        setSelectedCategory(event.target.value)
    }
    

    //caalculate the index range
    const calculatePageRange = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return { startIndex, endIndex };
    }

    // function for the next page
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }
    //function for prev page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage-1)
        }
    }
    //...button based filtering
    const handleClick = (event) => {
        setSelectedCategory(event.target.value)
    }
    // main functions
    const filteredData = (jobs, selected, query) => {
        let filteredJobs = jobs;
        //filtering input items
        if (query) {
          filteredJobs = filteredItems;
        }
        //category filtering
        if (selected) {
            filteredJobs = filteredJobs.filter
                (({ maxPrice, experienceLevel, salaryType, employmentType, postingDate,jobLocation }) =>
                    
                jobLocation.toLowerCase()===selected.toLowerCase()||
                    parseInt(maxPrice) <= parseInt(selected) ||
                    postingDate >= selected||
                    salaryType.toLowerCase() === selected.toLowerCase() ||
                    postingDate >= selected ||
                    experienceLevel.toLowerCase() === selected.toLowerCase()||
                    employmentType.toLowerCase() === selected.toLowerCase() 
                    
                      
                );
          console.log(filteredJobs);
        }
        //slice the data based on current page 
        const { startIndex, endIndex } = calculatePageRange();
        filteredJobs=filteredJobs.slice(startIndex,endIndex)
        return filteredJobs.map((data, i) => <Card key={i} data={data} />);
      };
      

    const result = filteredData(jobs, selectedCategory, query);
    return (
        <Box >
        
            <Navbar />
            <Banner query={query} handleInputChange={handleInputChange} />
{/* Main content */}
            <div
            className="main-content" style={{  paddingLeft: "6rem",
                paddingRight: "6rem" ,display:"grid", paddingTop: '3rem', paddingBottom: '3rem', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '2rem', background: '#ededed' }}
            >
                <div style={{ padding: '1rem', borderRadius: '0.25rem', backgroundColor: '#ffffff' }}>
                    <Sidebar handleChange={handleChange} handleClick={handleClick} />
                </div>
                {/* job  cards */}
                <div style={{ padding: '1rem', gridColumn: 'span 2 / span 2', borderRadius: '0.25rem', backgroundColor: '#ffffff' }}>
                    {
                        isLoading ? (<p style={{fontWeight:"500"}}>Loading...</p>) : result.length > 0?(<Jobs result={result} />) :<>
                            <h3 style={{marginBottom:"0.5rem",fontSize:"1.125rem",lineHeight:"1.75rem",fontWeight:"700"}}>{result.length} Jobs</h3>
                            <p>No Jobs found!!</p>
                            </>
                    }
                    {
                        result.length>0  ? (
                            <div style={{display: "flex", 
                                marginTop: "1rem", 
                                marginLeft: "2rem",
                                justifyContent: "center" 
                            
                                }}>
                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', marginRight: "1rem" }} onClick={prevPage} disabled={currentPage===1}>Previous</button>
                                
                                <span style={{marginLeft: "0.5rem",
                                    marginRight: "0.5rem"
                              }}>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                                                           
                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', marginLeft: "1rem" }} onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}>Next</button>
                                

                            </div>
                        ):""
                    }
   
                </div>
                
                <div style={{ padding: '1rem', borderRadius: '0.25rem', backgroundColor: '#ffffff' }}>
                    
                   <Newsletter/>
                    
                </div>
                
               

            </div>
            
        </Box>
    );
};

export default Home;
