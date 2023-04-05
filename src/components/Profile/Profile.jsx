import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { ExitToApp } from "@mui/icons-material";
import { Typography, Box, Button } from "@mui/material";

const Profile = () => {
  const { user } = useSelector(userSelector);
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const favouriteMovies = [];
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Login &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favouriteMovies.length ? (
        <Typography>
          Add favourites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>Favourite Movies</Box>
      )}
    </Box>
  );
};

export default Profile;
