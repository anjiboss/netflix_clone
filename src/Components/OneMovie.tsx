import React, { useContext } from "react";
import { GlobalContext } from "../App";
import { constant } from "../constant";
import { Movie } from "../types/types";
import { motion } from "framer-motion";

interface MovieProps {
  movie: Movie;
}

const OneMovie: React.FC<MovieProps> = ({ movie }) => {
  const { setModalMovie, setOpenModal } = useContext(GlobalContext);

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      className="movie"
      onClick={() => {
        setOpenModal(true);
        setModalMovie(movie);
      }}
    >
      <img
        src={
          constant.IMG_POSTER_URL + (movie.backdrop_path || movie.poster_path)
        }
        alt={movie.title}
      />
      <h2 onClick={() => console.log("click")}> {movie.title}</h2>
    </motion.div>
  );
};
export default OneMovie;
