import React, { useState } from "react";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Remove,
  ArrowBack,
  FavoriteBorderOutlined,
  Favorite,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useGetMovieQuery,
  useGetRecommendationQuery,
} from "../../services/TMDB";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Modal,
  Rating,
  Typography,
} from "@mui/material";
import genreIcons from "../../assets/genres";
import useStyles from "./styles";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { MovieList } from "..";

const MovieInformation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { data, isFetching, error } = useGetMovieQuery(id);
  const {
    data: recommendations,
    isFetching: recommendationFetching,
    error: recommendationsError,
  } = useGetRecommendationQuery({
    list: "/recommendations",
    movie_id: id,
  });

  if (isFetching || recommendationFetching)
    return (
      <Box justifyContent="center" display="flex" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );

  if (error || recommendationsError)
    return (
      <Box justifyContent="center" display="flex" alignItems="center">
        <Link to="/">Something has gone wrong - Go back</Link>
      </Box>
    );

  const addToFavourite = () => {};
  const addToWatchlist = () => {};

  const isMovieFavourited = false;
  const isMovieWatchlistted = false;

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} align="center">
        <img
          src={
            data?.poster_path
              ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
              : ""
          }
          className={classes.poster}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data?.vote_average / 2} />
            <Typography
              gutterBottom
              variant="subtitle1"
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography gutterBottom variant="h6" align="center">
            {data?.runtime}min{" "}
            {data?.spoken_languages?.length > 0
              ? `/ ${data?.spoken_languages[0].name}`
              : ""}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => {
                dispatch(selectGenreOrCategory(genre.id));
              }}
            >
              <img
                src={genreIcons[genre?.name.toLowerCase(genre.id)]}
                className={classes.genreImage}
                height={30}
                alt="listICON"
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
          Overview
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data?.credits.cast
              .map(
                (cast, i) =>
                  cast.profile_path && (
                    <Grid
                      item
                      key={i}
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${cast.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className={classes.castImage}
                        src={
                          cast?.profile_path
                            ? `https://image.tmdb.org/t/p/w500/${cast?.profile_path}`
                            : ""
                        }
                        alt={cast.name}
                      />
                      <Typography color="textPrimary" align="center">
                        {cast?.name}
                      </Typography>
                      <Typography color="textSecondary" align="center">
                        {cast.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  onClick={addToFavourite}
                  endIcon={
                    isMovieFavourited ? (
                      <FavoriteBorderOutlined />
                    ) : (
                      <Favorite />
                    )
                  }
                >
                  {isMovieFavourited ? "Unfavorite" : "Favorite"}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlistted ? <Remove /> : <PlusOne />}
                >
                  {isMovieWatchlistted ? "Remove" : "Watchlist"}
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    variant="subtitle2"
                    component={Link}
                    to="/"
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found.</Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data?.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
