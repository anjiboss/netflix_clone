import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-activity";
import { GlobalContext } from "../App";
import { constant } from "../constant";
import { Movie } from "../types/types";
import "react-activity/dist/library.css";
import FilteredByGenre from "../Components/FilteredByGenre";
import { randInt } from "../utils/__";
import BillBoard from "../Components/BillBoard";

const fetchConfig = {
  lang: "en-US",
};

const link1 = `https://api.themoviedb.org/3/discover/movie?api_key=${
  constant.Api_Key
}&language=${
  fetchConfig.lang
}&sort_by=popularity.desc&certification_country=ja&include_adult=false&include_video=false&page=${1}&with_watch_monetization_types=flatrate`;
const link2 = `https://api.themoviedb.org/3/discover/movie?api_key=${
  constant.Api_Key
}&language=${
  fetchConfig.lang
}&sort_by=popularity.desc&certification_country=ja&include_adult=false&include_video=false&page=${2}&with_watch_monetization_types=flatrate`;

const Home: React.FC = () => {
  // ANCHOR State
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [billboard, setBillboard] = useState<Movie>();
  const { genres } = useContext(GlobalContext);
  const [movieByGenre, setMovieByGenre] = useState<
    { name: string; movie: Movie[] }[]
  >([]);

  // ANCHOR Get movies
  useEffect(() => {
    const rq1 = axios.get(link1);
    const rq2 = axios.get(link2);
    axios.all([rq1, rq2]).then((value) => {
      const tmpMovies = [...value[0].data.results, ...value[1].data.results];
      setMovies(tmpMovies);
      const rand = randInt(0, tmpMovies.length - 1);
      setBillboard(tmpMovies[rand]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const tmp: { name: string; movie: Movie[] }[] = [];
    genres.forEach((gen) => {
      const movieByGenre = movies.filter((m) => m.genre_ids.includes(gen.id));
      tmp.push({
        name: gen.name,
        movie: movieByGenre,
      });
    });
    setMovieByGenre(tmp);
  }, [genres, movies]);

  return (
    <div>
      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Spinner
            size={50}
            color="#fff"
            style={{
              margin: "auto",
            }}
          />
        </div>
      ) : (
        <div>
          <BillBoard movie={billboard!} />
          {movieByGenre.map((genre, i) => {
            if (genre.movie.length >= 3) {
              return (
                <FilteredByGenre
                  key={i}
                  genre={genre.name}
                  movies={genre.movie}
                />
              );
            } else return undefined;
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
