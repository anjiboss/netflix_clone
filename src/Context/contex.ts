import React from "react";
import { Movie } from "../types/types";

interface Context {
  movies: Movie[];
}

export const HomeContext = React.createContext<Context>({
  movies: [],
});
