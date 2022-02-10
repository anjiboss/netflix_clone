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

interface GlobalContextType {
  genres: {
    id: number;
    name: string;
  }[];
}

export const GlobalContext = React.createContext<GlobalContextType>({
  genres: [],
});

function App() {
  const [genres, setGenres] = useState([]);
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
