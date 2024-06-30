import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios"; // Import axios for HTTP requests
import { tokens } from "../theme";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const customColors = ['#ECC9C7', '#D9E3DA', '#FDFFB6','#DEDAF4','#FFD6A5'];

  useEffect(() => {
    const fetchEmployeeDepartmentCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employee/designation-count');
        const fetchedData = response.data;

        // Transform fetched data to match chart's format
        const chartData = fetchedData.map((item, index) => ({
          department: item.department,
          employees: item.count,
          color: customColors[index % customColors.length] // Use a different color for each bar
        }));
  
        setData(chartData);
      } catch (error) {
        console.error('Failed to fetch employee department count:', error);
      }
    };
  
    fetchEmployeeDepartmentCount();
  }, []);

  return (
    <ResponsiveBar
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["employees"]}
      indexBy="department"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={(bar) => bar.data.color} // Use the assigned color for each bar
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Department",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Employee Count",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          data: data.map(item => ({ id: item.department, label: item.department ,color: item.color})),
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemTextColor: "#000",
          symbolSize: 20,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default BarChart;