import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-activity";
import { GlobalContext } from "../App";
import { constant } from "../constant";
import { Movie } from "../types/types";
import "react-activity/dist/library.css";
import FilteredByGenre from "../Components/FilteredByGenre";

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
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const { genres } = useContext(GlobalContext);
  const [movieByGenre, setMovieByGenre] = useState<
    { name: string; movie: Movie[] }[]
  >([]);

  useEffect(() => {
    const rq1 = axios.get(link1);
    const rq2 = axios.get(link2);
    axios.all([rq1, rq2]).then((value) => {
      console.log(value);
      setMovies([...value[0].data.results, ...value[1].data.results]);
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
    console.log(tmp);
    setMovieByGenre(tmp);
  }, [genres, movies]);

  return (
    <div>
      {loading ? (
        <div>
          <Spinner size={50} color="#fff" />
        </div>
      ) : (
        <div>
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
