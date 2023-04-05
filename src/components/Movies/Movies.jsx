import React, { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList, Pagination } from "..";
const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });
  const numberOfMovies = 17;
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }
  if (!data.results.length || data.results.length === 0) {
    return (
      <Box display="flex" alignItems="center" mt="20px" justifyContent="center">
        <Typography variant="h4">
          NO Movies match that name.
          <br /> Please search for something else.
        </Typography>
      </Box>
    );
  }
  if (error) {
    return "Error in fetching the data";
  }

  return (
    <div>
      <MovieList movies={data} numberOfMovies={numberOfMovies} />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  );
};

export default Movies;
