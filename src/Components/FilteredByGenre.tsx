import React, { useMemo, useState } from "react";
import { Movie } from "../types/types";
import OneMovie from "./OneMovie";
import { motion } from "framer-motion";

interface FilteredByGenreProps {
  genre: string;
  movies: Movie[];
}

const FilteredByGenre: React.FC<FilteredByGenreProps> = ({ genre, movies }) => {
  const [showPag, setShowPag] = useState(false);
  const [pagnition, setPagnition] = useState(0);
  const totalPage = useMemo(() => {
    return Math.floor(movies.length / 5);
  }, [movies]);

  const renderMovie = useMemo(() => {
    return movies.slice(pagnition * 5, pagnition * 5 + 5);
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
          <button>{"<"}</button>
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
          <button>{">"}</button>
        </div>
      )}
    </motion.div>
  );
};
export default FilteredByGenre;
