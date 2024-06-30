import { useState,useEffect } from "react";
import { Routes, Route, Navigate ,createBrowserRouter,RouterProvider} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Topbar2 from "./scenes2/global/Topbar2";
import JobDetails from "./scenes3/jobdetails";
import Home from "./scenes3/pages/home";
import Atendence2 from "./scenes2/attendance2";
import Sidebar2 from "./scenes2/global/Sidebar2";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Dashboard2 from "./scenes2/dashboard2";
import Calendar2 from "./scenes2/calendar";
import Team from "./scenes/team";
import Form2 from "./scenes2/form";
import LeaveForm from "./scenes2/leaves";
import attendance from "./scenes/attendance";
import { useNavigate } from 'react-router-dom';
import Leaves from "./scenes/leaves";
import Talent from "./scenes/talent";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar";
import Attendence from "./scenes/attendance";
import Login from './Login';
import SignUp from './signUp';
import Payroll from "./scenes/Payroll";
import { Settings } from "@mui/icons-material";
import Setting from "./scenes3/profile/settings";
import Homesetting from "./scenes3/pages/homesetting";
import HomeJoblists from "./scenes3/pages/HomeJoblists"
import { useAuth } from "./utilis/AuthContext";




function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isSidebar2, setIsSidebar2] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loginType, setLoginType] = useState('');
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const navigate = useNavigate();

  const {currentUser} = useAuth()

  console.log(currentUser)

  const handleLoginClick = (type) => {
    setLoggedIn(true);
    setLoginType(type);
  };
 
  const handleSignUpClick = () => {
   
    console.log('Sign Up clicked!');
    // setIsSignUpClicked(true);
    setLoggedIn(true) // Set the state to true when sign-up button is clicked
    navigate('/signUp');// Set the state to true when sign-up button is clicked
    };

    
  
    useEffect(() => {
      // Redirect to the default route or login page when the component mounts
      navigate('/');
    }, []);


  return (
    
    <div>
      {!isLoggedIn && <Login onLoginClick={handleLoginClick} handleSignUpClick={handleSignUpClick} />}
      {isLoggedIn && (
        <>
          {loginType === 'admin' && (
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Routes>
                    <Route path="/leaves" element={<Leaves />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/team" element={<Team />} />
                      <Route path="/attendance" element={<Attendence />} />
                      <Route path="/form" element={<Form />} />
                      <Route path="/bar" element={<Bar />} />
                      <Route path="/talent" element={<Talent />} />
                      <Route path="/pie" element={<Pie />} />
                      <Route path="/line" element={<Line />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/payroll" element={<Payroll />} />
                      <Route path="/" element={<Dashboard />} />
                     
                    </Routes>
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          )}
          {loginType === 'employee' && (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Sidebar2 isSidebar2={isSidebar2} />
                  <main className="content">
                  <Topbar2 setIsSidebar2={setIsSidebar2}  />
          <Routes>
            <Route path="/" element={<Dashboard2 />} />
            <Route path="/calendar" element={<Calendar2 />} />
                      <Route path="/leaves" element={<LeaveForm />} />
                      <Route path="/attendance2" element={<Atendence2/>}/>
            <Route path="/form" element={<Form2 />} />

            
            
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
)}


          {loginType === 'applicant' && (
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme} />
              <CssBaseline />
              {/* <Home/> */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profilesetting" element={<Homesetting />} />
                <Route path="/joblist" element={<HomeJoblists
                 />} />

               
              </Routes>
           </ColorModeContext.Provider>
          )}
        </>
      )}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/get_job/:id" element={<JobDetails />} />
        {/* <Route path="/profile" element={<Setting />} /> */}
        {/* <Route path="/profilesetting" element={<Homesetting />} /> */}

      </Routes>
    </div>
    
  );
 
    
  
}

export default App;