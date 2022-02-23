import React, { useContext, useMemo } from "react";
import Select from "react-select";
import { GlobalContext } from "../App";
import SearchRecommend from "./SearchRecommend";

const SearchBar: React.FC = () => {
  const { movies } = useContext(GlobalContext);
  const options = useMemo(() => {
    const tmp: {
      value: number;
      label: string;
    }[] = [];
    movies.forEach((m) => {
      tmp.push({
        value: m.id,
        label: m.title,
      });
    });
    return tmp;
  }, [movies]);
  return (
    <>
      <Select
        className="search-bar"
        options={options}
        styles={{
          input: (base) => ({
            ...base,
            color: "#fff",
          }),
          noOptionsMessage: (base) => ({
            ...base,
            color: "#fff",
          }),
        }}
        components={{ Option: SearchRecommend }}
        noOptionsMessage={() => "Press Enter To Search for More"}
      />
    </>
  );
};

export default SearchBar;
