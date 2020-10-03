import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { flex, whiteBox } from "../../Styles/Mixin";

const Wrapper = styled.div`
  height: 80vh;
  ${flex("column", "center", "center")};
`;

const Box = styled.div`
  ${whiteBox}
  margin-top: 12px;
  max-width: 350px;
  width: 100%;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
  margin: 0 0 10px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`;
const AuthPresenter = ({
  action,
  username,
  password,
  firstName,
  lastName,
  email,
  setAction,
}) => {
  return (
    <Wrapper>
      <Form>
        {action === "logIn" ? (
          <form>
            <Input placeholder={"Username"} {...username} />
            <Input placeholder={"Password"} {...password} type="password" />
            <Button text={"Log In"} />
          </form>
        ) : (
          <form>
            <Input placeholder={"First name"} {...firstName} />
            <Input placeholder={"Last name"} {...lastName} />
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Username"} {...username} />
            <Input placeholder={"Password"} {...password} type="password" />
            <Button text={"Sign Up"} />
          </form>
        )}
      </Form>
      <StateChanger>
        {action === "logIn" ? (
          <>
            Don't have an account?{" "}
            <Link
              onClick={() => {
                setAction("signUp");
              }}
            >
              SignUp
            </Link>
          </>
        ) : (
          <>
            Have an account?{" "}
            <Link
              onClick={() => {
                setAction("logIn");
              }}
            >
              LogIn
            </Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
export default AuthPresenter;
