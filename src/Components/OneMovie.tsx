import React from "react";
import { constant } from "../constant";
import { Movie } from "../types/types";

interface MovieProps {
  movie: Movie;
}

const OneMovie: React.FC<MovieProps> = ({ movie }) => {
  return (
    <div className="movie">
      <img
        src={
          constant.IMG_POSTER_URL + (movie.backdrop_path || movie.poster_path)
        }
        alt={movie.title}
      />
      <h2 onClick={() => console.log("click")}> {movie.title}</h2>
    </div>
  );
};
export default OneMovie;
