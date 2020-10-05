import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import Helmet from "../../Components/Helmet";
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
  firstName,
  lastName,
  email,
  secret,
  setAction,
  onLogin,
  onSignup,
  onConfirm,
}) => {
  return (
    <Wrapper>
      <Form>
        {action === "logIn" && (
          <>
            <Helmet>
              <title>LogIn | Nodigram </title>
            </Helmet>
            <form onSubmit={onLogin}>
              <Input
                placeholder={"Email"}
                value={email.value}
                onChange={email.onChange}
                type="email"
              />
              <Button text={"Log In"} />
            </form>
          </>
        )}
        {action === "signUp" && (
          <>
            <Helmet>
              <title>SignUp | Nodigram </title>
            </Helmet>
            <form onSubmit={onSignup}>
              <Input
                placeholder={"First name"}
                value={firstName.value}
                onChange={firstName.onChange}
                required={false}
              />
              <Input
                placeholder={"Last name"}
                value={lastName.value}
                onChange={lastName.onChange}
                required={false}
              />
              <Input
                placeholder={"Email"}
                value={email.value}
                onChange={email.onChange}
                type="email"
              />
              <Input
                placeholder={"Username"}
                value={username.value}
                onChange={username.onChange}
              />
              <Button text={"Sign Up"} />
            </form>
          </>
        )}
        {action === "confirm" && (
          <form onSubmit={onConfirm}>
            <Input
              placeholder={"Paste your Secret"}
              value={secret.value}
              onChange={secret.onChange}
            />
            <Button text={"Confirm"} />
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
