import React from "react";
import SearchPresenter from "./SearchPresenter";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";

const SearchContainer = () => {
  const { search } = useLocation();
  const term = search.split("=")[1];
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: { term },
  });
  //console.log(data);
  return <SearchPresenter term={term} data={data} loading={loading} />;
};
export default SearchContainer;
