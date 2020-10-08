import { gql } from "apollo-boost";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import useInput from "../Hooks/useInput";
import { flex, whiteBox } from "../Styles/Mixin";
import {
  CompassEmpty,
  CompassFull,
  HeartEmpty,
  HeartFull,
  Logo,
  PaperPlaneEmpty,
  PaperPlaneFull,
  User,
} from "./Icons";
import Input from "./Input";
import ProfileMenu from "./ProfileMenu";

const Container = styled.header`
  height: 55px;
  width: 100%;
  padding: 0 20px;
  ${whiteBox};
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.boxBorder};
  border-radius: 0;
  margin-bottom: 50px;
  ${flex("row", "center", "center")};
`;
const Wrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  ${flex("row", "center", "center")}
`;

const Column = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;
const HeaderLink = styled(Link)`
  &:not(:first-child) {
    margin-left: 20px;
  }
`;

const UserRow = styled.div`
  position: relative;
  display: inline;
  margin-left: 20px;
  cursor: pointer;
`;

const ME = gql`
  {
    myProfile {
      user {
        username
      }
    }
  }
`;

const Header = () => {
  const search = useInput("");
  const [openMenu, setOpenMenu] = useState(false);
  const history = useHistory();
  const { data } = useQuery(ME);
  const { pathname } = useLocation();

  const toggleMenu = (e) => {
    const { target } = e;
    if (target.classList.contains("profile")) setOpenMenu((cur) => !cur);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };

  useEffect(() => {
    window.onclick = () => {
      if (openMenu) setOpenMenu((cur) => false);
    };
  }, [openMenu]);

  return (
    <Container>
      <Wrapper>
        <Column>
          <Link to="/">
            <Logo />
          </Link>
        </Column>
        <Column>
          <form onSubmit={onSubmit}>
            <Input
              placeholder={"Search"}
              value={search.value}
              onChange={search.onChange}
              required={false}
              className={"search"}
            />
          </form>
        </Column>
        <Column>
          <HeaderLink to={"/direct/inbox"}>
            {pathname.startsWith("/direct") ? (
              <PaperPlaneFull />
            ) : (
              <PaperPlaneEmpty />
            )}
          </HeaderLink>
          <HeaderLink to={"/explore"}>
            {pathname === "/explore" ? <CompassFull /> : <CompassEmpty />}
          </HeaderLink>
          <HeaderLink to={"/notifications"}>
            {pathname === "/notifications" ? <HeartFull /> : <HeartEmpty />}
          </HeaderLink>
          {!data?.myProfile ? (
            <HeaderLink to={"/#"}>
              <User />
            </HeaderLink>
          ) : (
            <UserRow onClick={toggleMenu}>
              <User className={"profile"} />
              {openMenu && (
                <ProfileMenu username={data?.myProfile?.user?.username} />
              )}
            </UserRow>
          )}
        </Column>
      </Wrapper>
    </Container>
  );
};

export default Header;
