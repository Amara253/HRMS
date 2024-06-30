const getRandomStatus = () => {
    const statuses = ["Present", "Absent", "Leave"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  };
  
  const getRandomCheckTime = () => {
    const hours = Math.floor(Math.random() * 12) + 1; // Random hour between 1 and 12
    const minutes = Math.floor(Math.random() * 60); // Random minute between 0 and 59
    const period = hours < 12 ? "AM" : "PM"; // Determine AM or PM based on the hour
    const formattedHour = hours.toString().padStart(2, "0"); // Ensure two digits for hour
    const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure two digits for minutes
    return `${formattedHour}:${formattedMinutes} ${period}`;
  };
  
  const generateDataForMonth = (month, year, totalEmployees) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const employeeNames = [
      "John Doe",
      "Jane Smith",
      "Alice Johnson",
      "Bob Williams",
      "Eva Davis",
      "Michael Brown",
      "Olivia Miller",
      "William Davis",
      // Add more names as needed
    ];
  
    return Array.from({ length: totalEmployees }, (_, employeeIndex) => ({
      id: employeeIndex + 1,
      employee_id: employeeIndex + 1,
      employee_name: employeeNames[employeeIndex % employeeNames.length],
      days: Array.from({ length: daysInMonth }, (_, dayIndex) => {
        const status = getRandomStatus();
        return {
          day: dayIndex + 1,
          status: status,
          checkIn: status === "Present" ? getRandomCheckTime() : null,
          checkOut: status === "Present" ? getRandomCheckTime() : null,
        };
      }),
    }));
  };
  
  // Generate data for January 2024
  const januaryData = generateDataForMonth(1, 2024, 8);
  
  // Generate data for February 2024
  const februaryData = generateDataForMonth(2, 2024, 8);
  
  // Generate data for March 2024
  const marchData = generateDataForMonth(3, 2024, 8);
  
  export { januaryData, februaryData, marchData };
  