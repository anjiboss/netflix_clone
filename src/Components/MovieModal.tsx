import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { GlobalContext } from "../App";
import { constant } from "../constant";
import { MovieDetail } from "../types/types";

const getMovieDetail = async (movieId: number) => {
  const link =
    `https://api.themoviedb.org/3/movie/` +
    movieId +
    `?api_key=${constant.Api_Key}`;
  return axios({
    url: link,
    method: "get",
  });
};

const MovieModal: React.FC = () => {
  const { openModal, setOpenModal, modalMovie } = useContext(GlobalContext);
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  useEffect(() => {
    console.log({ modalMovie });
    if (modalMovie) {
      getMovieDetail(modalMovie.id).then(({ data }) => {
        console.log(data);
        setMovie(data);
      });
    }
  }, [modalMovie]);

  if (movie) {
    return (
      <>
        <ReactModal
          ariaHideApp={false}
          isOpen={openModal}
          onRequestClose={() => setOpenModal(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0, 0.6)",
            },
            content: {
              border: "none",
              padding: 0,
              backgroundColor: "#141414",
              width: 800,
              height: "70vh",
              margin: "auto",
              zIndex: 11,
            },
          }}
        >
          <div>
            <img
              src={`${
                constant.IMG_FULLSIZE_URL +
                (movie.backdrop_path ?? movie.poster_path)
              }`}
              style={{
                width: "100%",
                height: "45vh",
                objectFit: "cover",
              }}
              alt="background"
            />
          </div>
          <div className="movie-details">
            <div>
              <h2 style={{ textAlign: "center" }}>{movie.title}</h2>
              {movie.original_title !== movie.title && (
                <h4 style={{ textAlign: "center" }}>{movie.original_title}</h4>
              )}
              <hr
                style={{
                  width: "80%",
                  margin: "auto",
                }}
              />
              <div className="detail-container">
                <p style={{ color: "#fff" }}>評価: {movie.vote_average} ⭐️</p>
                <p>
                  <a href={movie.homepage}>ホームページ</a>
                </p>
              </div>
              <div className="detail-container">
                <p>
                  オリジナル言語:{" "}
                  {movie.production_countries[0]
                    ? movie.production_countries[0].name
                    : movie.original_language}
                </p>
                <p>公開日: {movie.release_date}</p>
              </div>
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <span>
                  ジャンル:
                  {movie.genres.map((g) => {
                    return <span key={g.id}>{g.name + " "}</span>;
                  })}
                </span>
              </div>
              <div>
                <p style={{ padding: "0 10px" }}>{movie.overview}</p>
              </div>
            </div>
          </div>
        </ReactModal>
      </>
    );
  } else return <></>;
};

export default MovieModal;
