import { QueryLazyOptions } from "@apollo/react-hooks";
import { ApolloError } from "apollo-boost";
import Form from "components/Form";
import Textfield from "components/Form/Textfield";
import { required } from "components/Form/validators";
import { GRAPHQL_API_ENDPOINT, TOKEN_KEY } from "config";
import React, { useCallback } from "react";
import cookie from "utils/Cookie";

type Props = {
  testLogin: (options?: QueryLazyOptions<{ language: string }> | undefined) => void;
  error: ApolloError | undefined;
  wasLoginAttempt: boolean;
  setLoginAttempt: React.Dispatch<React.SetStateAction<boolean>>;
};

const Authentication = ({ testLogin, error, wasLoginAttempt, setLoginAttempt }: Props) => {
  const handleSubmit = useCallback(
    async (values: { token: string }) => {
      cookie.save(TOKEN_KEY, values.token, GRAPHQL_API_ENDPOINT);
      testLogin();
      setLoginAttempt(true);
    },
    [testLogin, setLoginAttempt],
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Textfield name="token" label="Token: " validators={[required]} />
      <div>{error && wasLoginAttempt && error.message}</div>
      <button>Login</button>
    </Form>
  );
};

export default Authentication;
