import React, { useContext } from "react";
import {Typography, Box } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@mui/system";
import Navbar from "../navbar";
import Banner from "../banner";
import { useState } from "react";
import Card from "../../components/Card";
import { useEffect } from "react";
import Jobs from "../jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../newsletter/Newsletter";
import Setting from "../profile/settings";
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
    //load data 
    useEffect(() => {
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
    }, []);
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
            <Setting />
        </Box>
    );
};

export default Home;
