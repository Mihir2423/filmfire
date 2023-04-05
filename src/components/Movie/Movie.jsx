import React from "react";
import {
  Typography,
  Grid,
  Grow,
  Tooltip,
  Rating,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
const Movie = ({ movie, i }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(`(max-width: 600px)`);
  function ellipsis(word) {
    if (isMobile) return word;
    else if (word.length >= 14) {
      word = word.substring(0, 14) + "...";
    }
    return word;
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={i} timeout={200 * (i + 1)}>
        <Link className={classes.links} to={`/movie/${movie.id}`}>
          <img
            alt="movie_title"
            className={classes.image}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://unsplash.it/200/300'
            }
          />
        </Link>
      </Grow>
      <Typography className={classes.title} variant="h5">
        {ellipsis(movie.title)}
      </Typography>
      <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
        </div>
      </Tooltip>
    </Grid>
  );
};

export default Movie;
