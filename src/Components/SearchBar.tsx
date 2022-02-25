import React, { useContext, useMemo, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { GlobalContext } from "../App";
import SearchRecommend from "./SearchRecommend";

const SearchBar: React.FC = () => {
  const { movies } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
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
        placeholder="Search..."
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
        onInputChange={(e) => {
          setSearch(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate({
              pathname: "search",
              search: `${createSearchParams({
                search,
              })}`,
            });
          }
        }}
        components={{ Option: SearchRecommend }}
        noOptionsMessage={() => "Press Enter To Search for More"}
      />
    </>
  );
};

export default SearchBar;
