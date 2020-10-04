import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import {
  CONFIRM_SECRET,
  CREATE_ACCOUNT,
  LOCAL_LOG_IN,
  LOG_IN,
} from "./AuthQueries";
const AuthContainer = () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const secret = useInput("");
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value },
  });
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: { email: email.value, secret: secret.value },
  });
  const [logUserInMutation] = useMutation(LOCAL_LOG_IN);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });

  const onLogin = async (e) => {
    e.preventDefault();
    if (email.value !== "") {
      try {
        const {
          data: { requestSecret },
        } = await requestSecretMutation({
          variables: { email: email.value },
        });
        if (!requestSecret) {
          toast.error("You don't have an account yet, create on first");
          setTimeout(() => {
            setAction("signUp");
          }, 2000);
        } else {
          toast.success("Check your inbox for your login secret");
          setAction("confirm");
        }
      } catch (e) {
        toast.error("Can't request secret, please try again");
      }
    } else toast.warn("Email is required");
  };
  const onSignup = async (e) => {
    e.preventDefault();
    if (
      email.value !== "" &&
      username.value !== "" &&
      firstName.value !== "" &&
      lastName.value !== ""
    )
      try {
        const {
          data: { createAccount },
        } = await createAccountMutation({
          variables: {
            email: email.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value,
          },
        });
        if (createAccount) {
          toast.success("Create Account Success, Log In now");
          setTimeout(() => {
            setAction("logIn");
          }, 2000);
        } else {
          toast.error("Account already exist");
        }
      } catch (e) {
        toast.error(e.message);
        //toast.error("Can't create account, please try again");
      }
    else {
      toast.error("All fields are required");
    }
  };
  const onConfirm = async (e) => {
    e.preventDefault();
    if (secret.value !== "") {
      try {
        const {
          data: { confirmSecret: token },
        } = await confirmSecretMutation({
          variables: {
            email: email.value,
            secret: secret.value,
          },
        });
        if (token !== "" && token !== undefined) {
          logUserInMutation({
            variables: { token },
          });
        } else {
          throw Error();
        }
      } catch (e) {
        toast.error("Can't confirm Secret, please try again");
      }
    }
  };
  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onLogin={onLogin}
      onSignup={onSignup}
      onConfirm={onConfirm}
    />
  );
};
export default AuthContainer;
