import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dots } from "react-activity";
import { constant } from "../constant";
import { Movie } from "../types/types";

const fetchConfig = {
  lang: "en-US",
};

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    setLoading(true);
    axios({
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${constant.Api_Key}&language=${fetchConfig.lang}&sort_by=popularity.desc&certification_country=ja&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&append_to_response=images`,
      method: "GET",
    }).then(({ data }) => {
      setLoading(false);
      console.log(data);
      setMovies(data.results);
    });
  }, [page]);
  return (
    <div>
      <h1>Test</h1>
      <div>
        <Dots size={25} />
      </div>
      <button onClick={() => setPage(page + 1)}>Page ++ </button>
      <button onClick={() => setPage(page - 1)}>Page -- </button>
      <div className="movie-container">
        {loading ? (
          <Dots size={50} />
        ) : (
          movies.length > 0 &&
          movies.map((movie) => (
            <div key={movie.id}>
              <img
                src={
                  constant.IMG_BASE_URL +
                  (movie.backdrop_path || movie.poster_path)
                }
                alt={movie.title}
              />
              <h2> {movie.title}</h2>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
