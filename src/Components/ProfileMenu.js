import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import { flex, whiteBox } from "../Styles/Mixin";
import { Logout, Setting, User } from "./Icons";
import { useMutation } from "react-apollo-hooks";

const Container = styled.div`
  position: absolute;
  width: 230px;
  right: 0;
  top: 20px;
  z-index: 1;
  ${whiteBox};
`;

const MenuWrapper = styled.ul`
  position: relative;
  width: 100%;
  ${flex("column", "flex-start")};
`;

const Item = styled.li`
  width: 100%;
  padding: 8px 10px;
  ${flex("row", "center", "flex-start")};
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 0.6;
  }
  svg {
    margin: 0 10px;
    padding: 2px;
  }
`;

const HeaderLink = styled(Link)`
  ${flex("row", "center")};
  color: ${(props) => props.theme.blackColor};
`;

const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

const ProfileMenu = ({ username }) => {
  const [logOut] = useMutation(LOG_OUT);

  return (
    <Container>
      <MenuWrapper>
        <Item>
          <HeaderLink to={`/${username}`}>
            <User size={20} />
            Profile
          </HeaderLink>
        </Item>
        <Item>
          <HeaderLink to={`/accounts/edit`}>
            <Setting size={20} />
            Edit Profile
          </HeaderLink>
        </Item>
        <Item onClick={logOut}>
          <Logout size={20} />
          LogOut
        </Item>
      </MenuWrapper>
    </Container>
  );
};
ProfileMenu.propTypes = {
  username: propTypes.string.isRequired,
};
export default ProfileMenu;
