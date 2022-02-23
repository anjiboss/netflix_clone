import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResult from "../Components/SearchResult";
import { constant } from "../constant";
import { Movie } from "../types/types";

const getSearchMovies = async (query: string) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${constant.Api_Key}&query=${query}&page=1&include_adult=false`;
  return axios({
    url,
    method: "GET",
  });
};

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      getSearchMovies(query).then(({ data }) => {
        setMovies(data.results);
      });
    } else {
      console.log("no query");
    }
  }, [searchParams]);
  return (
    <div
      style={{
        paddingTop: "5vh",
      }}
    >
      {movies.length > 0 ? (
        <SearchResult movies={movies} />
      ) : (
        <h4>検索したい映画は見つかりませんでした</h4>
      )}
    </div>
  );
};

export default Search;
