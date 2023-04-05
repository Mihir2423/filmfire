import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const page = 1;

const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;

//https://api.themoviedb.org/3/movie/top_rated?api_key=623f84a9ee94849c4b2380aa3b5953cb&language=en-US&page=1

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    // Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        if(searchQuery){
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
        }

        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    getMovie : builder.query({
      query : (id) => `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
    }),

    getRecommendation : builder.query({
      query : ({movie_id, list}) => `movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
    }),

    getActorsDetails : builder.query({
      query : (id) => `/person/${id}?api_key=${tmdbApiKey}`
    }),

    getActorsMovies : builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
    })

  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery, useGetRecommendationQuery, useGetActorsDetailsQuery, useGetActorsMoviesQuery } = tmdbApi;
