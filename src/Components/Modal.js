import React, { useEffect } from "react";
import styled from "styled-components";
import { whiteBox, flex } from "../Styles/Mixin";

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${flex("row", "center", "center")}
  background-color: rgba(0,0,0,0.5);
`;

const Dialog = styled.div`
  ${whiteBox};
  width: 100vw;
  max-width: 400px;
  min-width: 260px;
  height: 450px;
`;

const Modal = ({ toggleModal, children }) => {
  const clickOutSide = (e) => {
    const { target } = e;
    if (
      target.classList.contains("overlay") ||
      target.classList.contains("close")
    )
      toggleModal();
  };
  return (
    <Overlay onClick={clickOutSide} className={"overlay"}>
      <Dialog>{children}</Dialog>
    </Overlay>
  );
};
export default Modal;
