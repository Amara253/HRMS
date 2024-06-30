import React, { useState } from 'react';
import { Typography, Button } from '@mui/material'; // Import Button from @mui/material
import InputBase from "@mui/material/InputBase";
import { tokens, ColorModeContext } from '../../theme';
import { Box, IconButton, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

const Banner = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [isSearchFocused1, setIsSearchFocused1] = useState(false);
    const [isSearchFocused2, setIsSearchFocused2] = useState(false);

    const handleSearchFocus1 = () => {
        setIsSearchFocused1(true);
        setIsSearchFocused2(false); // Ensure the other search bar is not focused
    };

    const handleSearchBlur1 = () => {
        setIsSearchFocused1(false);
    };

    const handleSearchFocus2 = () => {
        setIsSearchFocused2(true);
        setIsSearchFocused1(false); // Ensure the other search bar is not focused
    };

    const handleSearchBlur2 = () => {
        setIsSearchFocused2(false);
    };

    return (
        <div
            style={{
                paddingLeft: '6rem',
                paddingRight: '6rem',
                maxWidth: '1536px',
                paddingTop: '5rem',
                paddingBottom: '5rem',
            }}
        >
            <Typography
                variant='h3'
                style={{
                    marginBottom: '0.75rem',
                    lineHeight: '1',
                    fontWeight: 700,
                }}
            >
                Find your <span style={{ color: '#3575E2' }}>new job</span> today
            </Typography>
            <Typography
                variant='h6'
                style={{
                    color: '#444444',
                }}
            >
                Thousands of jobs in Codistan Ventures are waiting for you.
            </Typography>
            
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 4,
                    width: "90%", // Adjusted width to create no gap
                    border: `2px solid ${isSearchFocused1 ? '#3575E2' : '#D0D0D0'}`,
                    borderRadius: '2px',
                    transition: 'border-color 0.3s ease-in-out',
                }}
            >
                <IconButton type="button" sx={{ p: 2 }}>
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{
                        flex: 1,
                        backgroundColor: colors.primary[400],
                        height: "3rem",
                        width: "100%",
                        color: '#111827',
                        border: 'none',
                        outline: 'none',
                    }}
                    placeholder="What position are you looking for?"
                    onFocus={handleSearchFocus1}
                    onBlur={handleSearchBlur1}
                    onChange={props.handleInputChange}
                    value={props.query}
                />
                <Button
                    type="submit"
                    style={{
                        height:"3rem",
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                        backgroundColor:"#3575E2",
                        borderRadius: '0.25rem',
                        color: '#ffffff',
                    }}
                >
                    Search
                </Button>
            </Box>
        </div>
    );
};

export default Banner;
