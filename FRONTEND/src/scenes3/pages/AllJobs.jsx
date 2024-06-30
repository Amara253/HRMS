import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Navbar from '../navbar';
import Card from '../../components/Card';
import Newsletter from '../newsletter/Newsletter';
import axiosInstance from '../../utilis/ApiRequest';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load all jobs data
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
  axiosInstance.get('/get_jobs')
    .then((response) => {
      setJobs(response.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data:', error.message);
      setIsLoading(false);
    });
};

  return (
    <Box>
      
<div style={{display:"grid"}}></div>
      {/* Main content */}
      <div
        className="main-content"
        style={{
          paddingLeft: '6rem',
          paddingRight: '6rem',
          display: 'grid',
          paddingTop: '3rem',
          paddingBottom: '3rem',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', // Adjust column count as needed
          gap: '2rem',
          background: '#ededed',
        }}
      >
        {/* Job cards */}
        <div
          style={{
            padding: '1rem',
            borderRadius: '0.25rem',
            backgroundColor: '#ffffff',
            gridColumn: 'span 3', // Span all 3 columns
          }}
        >
          {isLoading ? (
            <p style={{ fontWeight: '500' }}>Loading...</p>
          ) : jobs.length > 0 ? (
            jobs.map((data, i) => <Card key={i} data={data} />)
          ) : (
            <p>No Jobs found!!</p>
          )}
        </div>

        
      </div>
    </Box>
  );
};

export default AllJobs;
