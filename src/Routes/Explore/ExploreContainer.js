import React from "react";
import { useQuery } from "react-apollo-hooks";
import ExplorePresenter from "./ExplorePresenter";
import { EXPLORE_POST } from "./ExploreQueries";

const ExploreContainer = () => {
  const { data, loading } = useQuery(EXPLORE_POST);
  console.log(data, loading);
  return <ExplorePresenter loading={loading} data={data} />;
};
export default ExploreContainer;
