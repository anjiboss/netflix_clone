import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import NotFound from "./Pages/NotFound";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { constant } from "./constant";
import { Movie } from "./types/types";
import MovieModal from "./Components/MovieModal";
import Search from "./Pages/Search";

interface GlobalContextType {
  genres: {
    id: number;
    name: string;
  }[];
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;

  modalMovie?: Movie;
  setModalMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;

  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
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

const link3 = `https://api.themoviedb.org/3/discover/movie?api_key=${
  constant.Api_Key
}&language=${
  fetchConfig.lang
}&sort_by=popularity.desc&certification_country=ja&include_adult=false&include_video=false&page=${1}&with_watch_monetization_types=flatrate`;

export const GlobalContext = React.createContext<GlobalContextType>({
  genres: [],
  movies: [],
  setMovies: () => {},
  setModalMovie: () => {},
  openModal: false,
  setOpenModal: () => {},
});

function App() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [modalMovie, setModalMovie] = useState<Movie | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);
  // ANCHOR Get movies
  useEffect(() => {
    const rq1 = axios.get(link1);
    const rq2 = axios.get(link2);
    const rq3 = axios.get(link3);
    axios.all([rq1, rq2, rq3]).then((value) => {
      const tmpMovies = [...value[0].data.results, ...value[1].data.results];
      setMovies(tmpMovies);
    });
  }, []);

  // _HANDLER Disable Body Scroll when Modal Opened
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openModal]);

  // ANCHOR Get movies
  useEffect(() => {
    axios({
      url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${constant.Api_Key}&language=en-US`,
      method: "get",
    }).then(({ data }) => {
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
          modalMovie,
          setModalMovie,
          openModal,
          setOpenModal,
        }}
      >
        <Header />
        <main>
          {openModal && <MovieModal />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
