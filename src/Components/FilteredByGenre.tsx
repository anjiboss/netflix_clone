import React, { useMemo, useState } from "react";
import { Movie } from "../types/types";
import OneMovie from "./OneMovie";
import { motion } from "framer-motion";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

interface FilteredByGenreProps {
  genre: string;
  movies: Movie[];
}

const FilteredByGenre: React.FC<FilteredByGenreProps> = ({ genre, movies }) => {
  const [showPag, setShowPag] = useState(false);
  const [pagnition, setPagnition] = useState(0);
  const totalPage = useMemo(() => {
    return Math.floor(movies.length / 8);
  }, [movies]);

  const renderMovie = useMemo(() => {
    return movies.slice(pagnition * 8, pagnition * 8 + 8);
  }, [movies, pagnition]);

  return (
    <motion.div
      onMouseOver={() => setShowPag(true)}
      onMouseLeave={() => setShowPag(false)}
      className="line-container"
    >
      <h2>{genre}</h2>
      {showPag && pagnition - 1 >= 0 && (
        <div
          onClick={() => {
            setPagnition((prev) => prev - 1);
          }}
          className="left-pagnition"
        >
          <AiFillLeftCircle size={50} color="#fff" />
        </div>
      )}
      <motion.div className="line-movie">
        {renderMovie.map((m) => (
          <OneMovie movie={m} key={m.id} />
        ))}
      </motion.div>
      {showPag && pagnition + 1 <= totalPage && (
        <div
          onClick={() => setPagnition((prev) => prev + 1)}
          className="right-pagnition"
        >
          <AiFillRightCircle color="#fff" size={50} />
        </div>
      )}
    </motion.div>
  );
};
export default FilteredByGenre;
