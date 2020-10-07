import React from "react";
import { useParams } from "react-router-dom";
import ExplorePresenter from "./ExplorePresenter";

const ExploreContainer = () => {
  const { id } = useParams();
  console.log(id);
  return <ExplorePresenter />;
};
export default ExploreContainer;
