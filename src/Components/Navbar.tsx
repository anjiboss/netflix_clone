import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../App";
import { motion, useCycle } from "framer-motion";
import SearchBar from "./SearchBar";

const item = {
  open: {
    opacity: 1,
    y: 50,
  },
  closed: {
    opacity: 0,
    y: 0,
  },
};

const container = {
  open: {
    top: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    top: "-90vh",
  },
};

const Navbar: React.FC = () => {
  const { genres } = useContext(GlobalContext);
  const [showGenres, toggleShowGenres] = useCycle(false, true);

  return (
    <>
      <ul className="nav">
        <li>
          <Link to="/">Logo</Link>
        </li>
        <div className="category">
          <li>TV Series</li>
          <li>Movies</li>
          <motion.div
            className="genre-container"
            onClick={() => toggleShowGenres()}
          >
            Genre
            <motion.div
              variants={container}
              animate={showGenres ? "open" : "closed"}
              initial={false}
              className="genres"
            >
              {genres.map((genre) => (
                <motion.div variants={item} key={genre.id}>
                  {genre.name}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <li>
          <SearchBar />
        </li>
      </ul>
    </>
  );
};

export default Navbar;
