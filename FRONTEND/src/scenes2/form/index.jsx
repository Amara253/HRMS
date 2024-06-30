import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, IconButton, Grid , Button,Paper} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import upload from "../../utilis/upload.js";
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axiosInstance from '../../utilis/ApiRequest.js';
import { useAuth } from '../../utilis/AuthContext.js';



const Setting = () => {
    const[username,setUsername]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { currentUser } = useAuth()
 
    


    // State variables to toggle edit mode
    const [editUsername, setEditUsername] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    const [profilePicExists, setProfilePicExists] = useState(false);
  const [profileCVExists, setProfileCVExists] = useState(false);
  const [profilePicLink, setProfilePicLink] = useState('');
  const [profileCVLink, setProfileCVLink] = useState('');

  const [selectedCVFileName, setSelectedCVFileName] = useState('');
  const [selectedImageFileName, setSelectedImageFileName] = useState('');

  



    // Fetch user data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/get_employee/${currentUser._id}`);
                const userData = response.data; // Assuming the API returns user data object with a key 'applicant'
                setUsername(userData.firstName);
                setEmail(userData.email);
                setPassword(userData.password);
                if (userData.profilepic) {
                    setProfilePicExists(true);
                    setProfilePicLink(userData.profilepic); // Assuming userData has a "profilepic" field
                  } else {
                    setProfilePicExists(false);
                  }
            
                  if (userData.profilecv) {
                    setProfileCVExists(true);
                    setProfileCVLink(userData.profilecv); // Assuming userData has a "profilecv" field
                  } else {
                    setProfileCVExists(false);
                  }
                } catch (error) {
                  console.error('Error fetching user data:', error);
                }
        };
        fetchData();
    }, []);

   

    const handleEdit = (field) => {
        switch (field) {
            case 'username':
                setEditUsername(true);
                break;
            case 'email':
                setEditEmail(true);
                break;
            case 'password':
                setEditPassword(true);
                break;
            default:
                break;
        }
    };

    const handleSave = async (field) => {
        try {
            switch (field) {
                case 'username':
                    // Save username changes
                    if (!username.trim()) {
                        throw new Error('Username cannot be empty');
                    }
                    setEditUsername(false);
                    await axiosInstance.put(`/employeeName/${currentUser._id}`, { name: username });
                    break;
                case 'email':
                    // Validate email format
                    if (!email || !validateEmail(email)) {
                        throw new Error('Please provide a valid email');
                    }
                    // Save email changes
                    setEditEmail(false);
                    await axiosInstance.put(`/employeeEmail/${currentUser._id}`, { email });
                    break;
                case 'password':
                    // Save password changes
                    if (!password.trim()) {
                        throw new Error('Password cannot be empty');
                    }
                    setEditPassword(false);
                    await axiosInstance.put(`/employeePassword/${currentUser._id}`, { password});
                    break;
                default:
                    break;
            }
        } catch (error) {
            alert(error);
            
        }
    };
    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/;
        return regex.test(email);
    };

    const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCV, setSelectedCV] = useState(null);
  const [uploadStatusIMG, setUploadIMGStatus] = useState('');
  const [uploadStatusCV, setUploadCVStatus] = useState('');

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setSelectedImageFileName(file.name);
  };
   
  const handleUploadImage=async(event)=>
  {
 
    try {
      const imagePath = await upload(selectedImage);
      await axiosInstance.put(`/addEmployeeimg/${currentUser._id}`, {
        profilepic: imagePath,
      });
   
      // Handle success or error messages
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle image upload errors
    }
    setUploadIMGStatus('Uploaded successfully!');
    setTimeout(() => {
      setUploadIMGStatus('');
    }, 1000); 
   
    

  };

  const handleCVChange = async (event) => {
    const file = event.target.files[0];
    setSelectedCV(file);
    setSelectedCVFileName(file.name);

  };

  const handleUploadCV=async(event)=>
  {
    try {
      const cvPath = await upload(selectedCV);
      await axiosInstance.put(`/addEmployeecv/${currentUser._id}`, {
        profilecv: cvPath,
      });

      
      // Handle success or error messages
    } catch (error) {
      console.error('Error uploading CV:', error);
      // Handle CV upload errors
    }
    setUploadCVStatus('Uploaded successfully!');
    setTimeout(() => {
      setUploadCVStatus('');
    }, 1000); 

   

  };
  const displayFileName = (fileName) => {
    if (!fileName) {
      return 'No file chosen';
    }
    return fileName.length > 5 ? `${fileName.slice(0, 7)}...` : fileName;
  };

    return (
        <Box mt={5} justifyContent="left">
           <Box mt={5}>
            <Paper variant="outlined" elevation={3} style={{ padding: '8px', backgroundColor: '#f0f0f0', width: 'fit-content', borderRadius: '4px' }}>
                <Typography variant="body2" color="textSecondary">
                    <b>NOTE:</b> Whenever you update your username, email or password, make sure to <b>logout</b> so that the changes are visible system-wide. Thank you!
                </Typography>
            </Paper>
        </Box>
            <Box
                width={500}
                p={4}
                borderRadius={10}
                // Bluish shadow
            >
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', marginBottom: '40px', textAlign: 'left', color: '#333' ,fontFamily:"inherit"}}>Profile Settings</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={4}><Typography variant="body1" style={{ fontWeight: 'bold', marginTop:'5px' }}><PersonIcon ></PersonIcon>     Username:</Typography></Grid>
                    <Grid item xs={6}>
                        {editUsername ? (
                            <TextField type="text" value={username} onChange={(e) => setUsername(e.target.value)} variant="outlined" fullWidth style={{ height: '40px' }} />
                        ) : (
                            <Typography variant="body1" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>{username}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                        {editUsername ? (
                            <IconButton onClick={() => handleSave('username')} color="primary"><CheckCircleIcon /></IconButton>
                        ) : (
                            <IconButton onClick={() => handleEdit('username')} style={{ color: 'blue' }}><EditIcon /></IconButton>
                        )}
                    </Grid>
                    <Grid item xs={4}><Typography variant="body1" style={{ fontWeight: 'bold',marginTop:'9px' }}><EmailIcon></EmailIcon>     Email:</Typography></Grid>
                    <Grid item xs={6}>
                        {editEmail ? (
                            <TextField
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                fullWidth
                                style={{ height: '40px' }}
                                inputProps={{ pattern: /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/, title: "Please enter a valid email address" }}
                            />
                        ) : (
                            <Typography variant="body1" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>{email}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                        {editEmail ? (
                            <IconButton onClick={() => handleSave('email')} color="primary"><CheckCircleIcon /></IconButton>
                        ) : (
                            <IconButton onClick={() => handleEdit('email')} style={{ color: 'blue' }}><EditIcon /></IconButton>
                        )}
                    </Grid>
                    <Grid item xs={4}>
    <Typography variant="body1" style={{ fontWeight: 'bold', marginTop: '9px' }}>
        <LockIcon />
        Password:
    </Typography>
</Grid>
<Grid item xs={6}>
    {editPassword ? (
        <input
            type="text"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new Password"
            style={{ height: '40px', width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
    ) : (
        <Typography variant="body1" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
            Enter new Password
        </Typography>
    )}
</Grid>
<Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
    {editPassword ? (
        <IconButton onClick={() => handleSave('password')} color="primary">
            <CheckCircleIcon />
        </IconButton>
    ) : (
        <IconButton onClick={() => handleEdit('password')} style={{ color: 'blue' }}>
            <EditIcon />
        </IconButton>
    )}
</Grid>



                    
                    <Grid container spacing={2}>
                   
                    <Grid item xs={12}>
  <Box display="flex" alignItems="center" marginLeft="20px">
    <Button
      variant="contained"
      component="label"
      style={{ marginRight: 10, width: '200px', marginTop: '70px', background: 'gray' }}
    >
      Select Image
      <input type="file" hidden onChange={handleImageChange} />
    </Button>
    <Button
      variant="contained"
      color="primary"
      disabled={!selectedImage}
      onClick={handleUploadImage}
      style={{ marginRight: 10, width: '200px', marginTop: '70px' ,height: '40px'}}
      startIcon={<CloudUploadIcon />}
    > 
    {uploadStatusIMG === 'Uploaded successfully!' ? (
              <Typography variant="body2" style={{ color: 'white' }}>
                {uploadStatusIMG}
              </Typography>
            ) : (
              <span>UploadImage</span>
            )}
    </Button>
    {profilePicExists ? (
      <div style={{ display: 'flex', alignItems: 'center' ,marginTop:"70px"}}>
        <a
          href={profilePicLink}
          target="_blank"
          style={{ textDecoration: 'underline', color: '#0000FF', marginRight: '10px' }}
        >
          Uploaded Image
        </a>
        <Typography variant="body2" style={{marginTop:"50px"}}>{displayFileName(selectedImageFileName)}</Typography>
      </div>
    ) : (
      <Typography variant="body2" style={{marginTop:"50px"}}>{displayFileName(selectedImageFileName)}</Typography>
    )}
  </Box>
</Grid>

<Grid item xs={12}>
  <Box display="flex" alignItems="center" marginLeft="20px">
    <Button
      variant="contained"
      component="label"
      style={{ marginRight: 10, width: '200px', marginTop: '50px', background: 'gray', height: '40px' }}
    >
      Select CV
      <input type="file" hidden onChange={handleCVChange} />
    </Button>
    <Button
      variant="contained"
      color="primary"
      disabled={!selectedCV}
      onClick={handleUploadCV}
      style={{ marginRight: 10, width: '200px',marginTop:"50px", height: '40px' }}
      startIcon={<CloudUploadIcon />}
    >
     {uploadStatusCV === 'Uploaded successfully!' ? (
              <Typography variant="body2" style={{ color: 'white' }}>
                {uploadStatusCV}
              </Typography>
            ) : (
              <span>UploadCV</span>
            )}
    </Button>
    {profileCVExists ? (
      <div style={{ display: 'flex', alignItems: 'center' ,marginTop:"50px"}}>
        <a
          href={profileCVLink}
          target="_blank"
          style={{ textDecoration: 'underline', color: '#0000FF', marginRight: '10px' }}
        >
          Uploaded CV
        </a>
        <Typography variant="body2" style={{marginTop:"30px"}} >{displayFileName(selectedCVFileName)}</Typography>
      </div>
    ) : (
      <Typography variant="body2"style={{marginTop:"30px"}}>{displayFileName(selectedCVFileName)}</Typography>
    )}
  </Box>
</Grid>
    </Grid>
    </Grid>
    
    </Box>
    </Box>
  );
};

export default Setting;


