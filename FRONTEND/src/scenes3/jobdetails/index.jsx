import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import ApplyDialog from '../Dialog/ApplyDialog'; // Import the ApplyDialog component
import axiosInstance from '../../utilis/ApiRequest';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);


  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/api/get_job/${id}`);
        const data = response.data;
        setJob(data);
        setJobTitle(data.jobTitle)
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async (formData) => {
    // Implement apply logic here, you can use formData to send necessary data to the server
    console.log('Applying for job with data:', formData);
  };

  const handleApplyButtonClick = () => {
    setOpenApplyDialog(true);
  };

  const handleCloseApplyDialog = () => {
    setOpenApplyDialog(false);
  };

  return (
    <div>
      <Navbar />
      <div style={{ paddingLeft: '5rem', paddingRight: '1rem', maxWidth: '1536px', margin: 'auto' }}>
        <h2 style={{ color: '#007BFF' }}>Job details</h2>
        {/* Gray italic style lines */}
        <div style={{ marginTop: '5px', fontStyle: 'italic', color: '#888888' }}>
          <p>Here's how the job details align with your job preferences.</p>
          <p>Manage job preferences anytime in your profile.</p>
        </div>
        {job && (
          <>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
              <WorkOutlineOutlinedIcon /> Job type
            </Typography>
            {/* Render other job details here */}
            <Button
              style={{
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '2rem',
                paddingRight: '2rem',
                color: '#ffffff',
                backgroundColor: '#007BFF', // Replace with your desired background color
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
              onClick={handleApplyButtonClick}
            >
              {job.employmentType}
            </Button>
            {/* Add margin to create a gap */}
            <Button
              style={{
                marginLeft: '0.5rem', // Adjust the margin value as needed
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '2rem',
                paddingRight: '2rem',
                color: '#ffffff',
                backgroundColor: '#0056b3', // Replace with your desired background color
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
              onClick={handleApplyButtonClick}
            >
              Apply Now
            </Button>
          </>
        )}
      </div>
      <div
        className="main-content"
        style={{
          paddingLeft: '6rem',
          paddingRight: '6rem',
          display: 'grid',
          paddingTop: '3rem',
          paddingBottom: '3rem',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '2rem',
          background: '#ededed',
        }}
      >
        <div style={{ padding: '0.5rem', borderRadius: '0.25rem', backgroundColor: '#ffffff' }}>
          <Typography variant="h6">Benefits</Typography>
          <p>{job ? job.jobBenefits : 'Loading...'}</p>
        </div>
        {/* job cards */}
        <div
          style={{ padding: '0.5rem', gridColumn: 'span 2 / span 2', borderRadius: '0.25rem', backgroundColor: '#ffffff' }}
        >
          <Typography variant="h6">Outline</Typography>
          <p>{job ? job.jobOutline : 'Loading...'}</p>
        </div>

        <div style={{ padding: '0.5rem', borderRadius: '0.25rem', backgroundColor: '#ffffff' }}>
          <Typography variant="h6">Future Growth</Typography>
          <p>{job ? job.employmentFutureGrowth : 'Loading...'}</p>
        </div>
      </div>

      {/* Apply Dialog */}
      <ApplyDialog
        open={openApplyDialog}
        handleClose={handleCloseApplyDialog}
        jobId={id} // Pass id directly
        jobTitle={jobTitle}
        handleApply={handleApply}
      />
    </div>
  );
};

export default JobDetails;
