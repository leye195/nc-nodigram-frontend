import React from "react";
import styled from "styled-components";
import { flex } from "../Styles/Mixin";

const Footer = styled.footer`
  ${flex("row", "center", "space-between")};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin: 50px 0;
`;
const List = styled.ul`
  ${flex("row", "center", "center")};
`;
const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 15px;
  }
`;
const Link = styled.a`
  color: ${(props) => props.theme.darkBlueColor};
`;
const Copyright = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
`;
export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="#">About us</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Support</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Press</Link>
      </ListItem>
      <ListItem>
        <Link href="#">API</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Privacy</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Terms</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Directory</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Profiles</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Hashtags</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Language</Link>
      </ListItem>
    </List>
    <Copyright>&copy; Nodigram {new Date().getFullYear()}</Copyright>
  </Footer>
);
