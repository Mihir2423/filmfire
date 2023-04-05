import React, { useState } from "react";
import {
  useGetActorsDetailsQuery,
  useGetActorsMoviesQuery,
} from "../../services/TMDB";

import useStyles from "./styles";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

import { MovieList, Pagination } from "..";

const Actors = () => {
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const classes = useStyles();

  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movies, isFetching : fetchingMovies } = useGetActorsMoviesQuery({ id, page });

  if (isFetching || fetchingMovies)
    return (
      <Box justifyContent="center" display="flex" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );

  if (error)
    return (
      <Box justifyContent="center" display="flex" alignItems="center">
        <Link to="/">Something has gone wrong - Go back</Link>
      </Box>
    );

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} align="center">
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
          alt={data?.name}
        />
      </Grid>
      <Grid
        item
        container
        direction="column"
        lg={7}
        g={7}
        xl={8}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2" gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Born: {new Date(data?.birthday).toDateString()}
        </Typography>
        <Typography variant="body1" align="justify" paragraph>
          {data?.biography.length > 630 ? (
            showMore ? (
              <>
                {data?.biography}
                <Button
                  target="_blank"
                  sx={{
                    padding: 0,
                    margin: 0,
                    textTransform: "lowercase",
                    color: "gray",
                  }}
                  onClick={() => setShowMore(false)}
                >
                  see less.
                </Button>
              </>
            ) : (
              <>
                {data?.biography.slice(0, 629)} ...
                <Button
                  target="_blank"
                  sx={{
                    padding: 0,
                    margin: 0,
                    textTransform: "lowercase",
                    color: "gray",
                  }}
                  onClick={() => setShowMore(true)}
                >
                  read more.
                </Button>
              </>
            )
          ) : (
            data?.biography || "Sorry, no biography yet..."
          )}
        </Typography>
        <Box className={classes.btns}>
          <Button
            variant="contained"
            color="primary"
            target="_blank"
            href={`https://www.imdb.com/name/${data?.imdb_id}`}
          >
            IMDB
          </Button>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            color="primary"
          >
            Back
          </Button>
        </Box>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {movies ? (
          <MovieList movies={movies} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found.</Box>
        )}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={movies?.total_pages}
        />
      </Box>
    </Grid>
  );
};

export default Actors;
