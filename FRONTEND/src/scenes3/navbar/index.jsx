import React, { useState } from 'react';
import codistanlogo from '../../src assets/codistanlogo.png';
import codistan_logo_bg_remove from '../../src assets/codistan_logo_bg_remove.png';
import { NavLink, Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { FaUser, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons/fa
import { Popover, List, ListItem, ListItemText, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Settings from '../profile/settings';
import { useAuth } from '../../utilis/AuthContext';
import axios from 'axios';
import axiosInstance from '../../utilis/ApiRequest';



const Navbar = () => {

    const {logout} = useAuth()
    const { currentUser } = useAuth()

    const [profileAnchorEl, setProfileAnchorEl] = useState(null);

    const handleProfileClick = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileAnchorEl(null);
    };
   

  
    const handleLogout = async () => {
       
          // Make a POST request to the "/logout" endpoint with credentials set to true
          axiosInstance.post('/logout', {}, { withCredentials: true })
            .then(response => {
              // If the logout request is successful, reload the page
              
              
              window.location.reload();
            })
            .catch(error => {
              // Handle any errors here
              console.error('Logout failed:', error);
            });
        
    }

    const openProfile = Boolean(profileAnchorEl);
    const profileId = openProfile ? 'profile-popover' : undefined;


    const navItems = [
        { path: "/", title: "Start a search" },
        { path: "/joblist", title: "Jobs List" },
    ];

    return (
        <header
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '6rem',
                paddingRight: '6rem',
                maxWidth: '1536px',
                backgroundColor: '#FAFAFA',
            }}
        >
            <nav
                style={{
                    display: 'flex',
                    paddingTop: '0.2rem',
                    paddingBottom: '0.2rem',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <a
                        href="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'black',
                        }}
                    >
                        <img
                            src={codistan_logo_bg_remove}
                            alt="Codistan Logo"
                            width="120"
                            height="90"
                            viewBox="0 0 29 30"
                            style={{ marginRight: '1rem' }}
                        />
                        <span>
                            <Typography variant="h5" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>JobPortal</Typography>
                        </span>
                    </a>
                    <ul
                        style={{
                            listStyleType: 'none',
                            padding: 0,
                            display: 'flex',
                            marginLeft: '12rem',
                        }}
                    >
                        {navItems.map(({ path, title }) => (
                            <li
                                key={path}
                                style={{
                                    fontSize: '1.2rem',
                                    lineHeight: '1.5rem',
                                    marginLeft: '4rem',
                                }}
                            >
                                <NavLink
                                    to={path}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#444444',
                                        position: 'relative',
                                        fontFamily: 'verdana',
                                        fontWeight: 'bold',
                                       
                                    }}
                                    onMouseEnter={(e) => { e.target.style.color = '#007bff'; }} // Change color on hover
                                     onMouseLeave={(e) => { e.target.style.color = '#444444'; }} 
                                   
                                    activeStyle={{
                                        fontWeight: 'bold',
                                        color: '#007bff', // Dark blue color for active link
                                    }}
                                >
                                    {title}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: 2,
                                            backgroundColor: 'transparent',
                                            transition: 'background-color 0.3s',
                                        }}
                                    />
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '2rem',
                    }}
                >
                    {/* <FaBell style={{ fontSize: '2rem', marginRight: '2rem', color: 'blue' }} /> */}
                    <AccountCircleIcon
                        aria-describedby={profileId}
                        onClick={handleProfileClick}
                        style={{ fontSize: '2.5rem', cursor: 'pointer', color: '#33363d' }}
                    />
                    <Typography variant="body1" style={{ marginLeft: '1rem', fontFamily: 'Arial, sans-serif' }}>{currentUser.name}</Typography> {/* Display username */}
                    <Popover
                        id={profileId}
                        open={openProfile}
                        anchorEl={profileAnchorEl}
                        onClose={handleProfileClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        style={{ position: 'absolute', top: '1rem', left: '8rem', zIndex: 999 }} // Adjusted position and zIndex
                    >
                        <List style={{ minWidth: '200px', backgroundColor: '#d3d3d3', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}> {/* Styled popover */}
                            <ListItem button component={Link} to="/profilesetting"  onClick={handleProfileClose}>
                                <FaCog style={{ marginRight: '0.5rem' }} /> {/* Icon for Profile Settings */}
                                <ListItemText primary="Profile Settings" />
                            </ListItem>
                            <Divider />
                            <ListItem button  onClick={handleProfileClose}>
                                <FaSignOutAlt style={{ marginRight: '0.5rem' }} /> {/* Icon for Logout */}
                                <ListItemText primary="Logout" onClick={handleLogout}/>
                            </ListItem>
                        </List>
                    </Popover>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
