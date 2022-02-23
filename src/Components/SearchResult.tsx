import React from "react";
import { Movie } from "../types/types";
import OneMovie from "./OneMovie";

interface Props {
  movies: Movie[];
}

const SearchResult: React.FC<Props> = ({ movies }) => {
  return (
    <div className="movie-container">
      {movies.length > 0 &&
        movies.map((movie) =>
          movie.backdrop_path || movie.poster_path ? (
            <OneMovie movie={movie} key={movie.id} />
          ) : undefined
        )}
    </div>
  );
};

export default SearchResult;
