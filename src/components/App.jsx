import React from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Actors, MovieInformation, Movies, NavBar, Profile } from "./";

import useStyles from "./styles";


function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" exact element={<MovieInformation />} />
          <Route path="/actors/:id" exact element={<Actors />} />
          <Route path="/profile/:id" exact element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
