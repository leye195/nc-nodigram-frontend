import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { flex } from "../../Styles/Mixin";
const Wrapper = styled.div`
  ${flex("column", "center", "flex-start")}
  min-height:80vh;
`;

const FeedPresenter = ({ data, loading }) => {
  console.log(data, loading);
  return <Wrapper>{loading && <Loader />}</Wrapper>;
};
export default FeedPresenter;
