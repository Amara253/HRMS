import React from 'react';
import InputField from '../../components/InputField';

const JobPostingDate = ({ handleChange }) => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);//ms
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);//ms
  const ThirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);//ms

  //convert date to string
  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);//year month date
  const sevenDaysAgoDate = sevenDaysAgo.toISOString().slice(0, 10);
  const ThirtyDaysAgoDate=ThirtyDaysAgo.toISOString().slice(0, 10);
  return (
    <div>
    <h4
      style={{
        marginBottom: "0.5rem",
        fontSize: "1.125rem",
        lineHeight: "1.75rem",
        fontWeight: "500",
      }}
    >
      Date of posting
    </h4>
      <div>
      
      <InputField handleChange={handleChange} value="" title="All time" name="time" />
      <InputField handleChange={handleChange} value={twentyFourHoursAgoDate} title="Last 24 hours" name="time" />
      <InputField handleChange={handleChange} value={sevenDaysAgoDate} title="Last 7 days" name="time" />
      <InputField handleChange={handleChange} value={ThirtyDaysAgoDate} title="Last Month" name="time" />
    </div>
  </div>
  )
}

export default JobPostingDate;
