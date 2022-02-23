import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Test from "./Pages/Test";
import NotFound from "./Pages/NotFound";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { constant } from "./constant";
import { Movie } from "./types/types";

interface GlobalContextType {
  genres: {
    id: number;
    name: string;
  }[];
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

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

export const GlobalContext = React.createContext<GlobalContextType>({
  genres: [],
  movies: [],
  setMovies: () => {},
});

function App() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  // ANCHOR Get movies
  useEffect(() => {
    const rq1 = axios.get(link1);
    const rq2 = axios.get(link2);
    axios.all([rq1, rq2]).then((value) => {
      const tmpMovies = [...value[0].data.results, ...value[1].data.results];
      setMovies(tmpMovies);
    });
  }, []);

  useEffect(() => {
    axios({
      url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${constant.Api_Key}&language=en-US`,
      method: "get",
    }).then(({ data }) => {
      console.log(data);
      setGenres(data.genres);
    });
  }, []);
  return (
    <>
      <GlobalContext.Provider
        value={{
          genres,
          movies,
          setMovies,
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/test/:testId" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
