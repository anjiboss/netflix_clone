import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-activity";
import { GlobalContext } from "../App";
import { Movie } from "../types/types";
import "react-activity/dist/library.css";
import FilteredByGenre from "../Components/FilteredByGenre";
import { randInt } from "../utils/__";
import BillBoard from "../Components/BillBoard";

const Home: React.FC = () => {
  // ANCHOR State
  const [loading, setLoading] = useState(true);
  const { movies } = useContext(GlobalContext);
  const [billboard, setBillboard] = useState<Movie>();
  const { genres } = useContext(GlobalContext);
  const [movieByGenre, setMovieByGenre] = useState<
    { name: string; movie: Movie[] }[]
  >([]);

  // ANCHOR Get movies
  useEffect(() => {
    const rand = randInt(0, movies.length - 1);
    setBillboard(movies[rand]);
    setLoading(false);
  }, [movies]);

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
