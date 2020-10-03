import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { CONFIRM_SECRET, LOCAL_LOG_IN, LOG_IN } from "./AuthQueries";
const AuthContainer = () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const secret = useInput("");
  const requestSecretMutation = useMutation(LOG_IN, {
    variables: { email: email.value },
  });
  const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
    variables: { email: email.value, secret: secret.value },
  });
  const localLoginMutation = useMutation(LOCAL_LOG_IN);

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      username={username}
      password={password}
      firstName={firstName}
      lastName={lastName}
      email={email}
    />
  );
};
export default AuthContainer;
