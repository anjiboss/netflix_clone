import React from "react";
import { constant } from "../constant";
import { Movie } from "../types/types";

interface BillBoardProps {
  movie: Movie;
}

const BillBoard: React.FC<BillBoardProps> = ({ movie }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "70vh",
      }}
    >
      {movie && (
        <div
          style={{
            backgroundImage: `url(${
              constant.IMG_FULLSIZE_URL + movie.backdrop_path
            })`,
            width: "100%",
            height: "80vh",
            backgroundSize: "cover",
            position: "absolute",
            top: "2vh",
            left: 0,
          }}
        ></div>
      )}
    </div>
  );
};
export default BillBoard;
