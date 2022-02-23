import React, { ComponentType, useContext, useMemo } from "react";
// import { Movie } from "../types/types";
import { GroupBase, OptionProps } from "react-select";
import { GlobalContext } from "../App";
import { motion } from "framer-motion";
import { Dots } from "react-activity";
import { constant } from "../constant";

const SearchRecommend: ComponentType<
  OptionProps<
    { value: number; label: string },
    false,
    GroupBase<{ value: number; label: string }>
  >
> = ({ data }) => {
  const { movies, setModalMovie, setOpenModal } = useContext(GlobalContext);
  const movie = useMemo(() => {
    return movies.find((m) => m.id === data.value);
  }, [data.value, movies]);

  return (
    <motion.div
      onClick={() => {
        setModalMovie(movie);
        setOpenModal(true);
      }}
      style={{
        background: "#141414",
        height: 80,
        padding: 10,
        display: "flex",
        cursor: "pointer",
      }}
      whileHover={{
        background: "#4f4e4e",
      }}
    >
      {movie ? (
        <>
          <div>
            <motion.img
              whileHover={{
                scale: 1.1,
              }}
              src={`${constant.IMG_POSTER_URL + movie.poster_path}`}
              style={{
                width: 60,
                height: 70,
                objectFit: "cover",
                border: "none",
                borderRadius: 5,
              }}
              alt="poster"
            />
          </div>
          <div style={{ paddingTop: 5 }}>
            <span>{movie.title}</span>
          </div>
        </>
      ) : (
        <Dots />
      )}
    </motion.div>
  );
};
export default SearchRecommend;
