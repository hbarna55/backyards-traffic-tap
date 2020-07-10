import { QueryLazyOptions } from "@apollo/react-hooks";
import { ApolloError } from "apollo-boost";
import Form from "components/Form/Form";
import Button from "components/Form/StyledElements/Button/Button";
import Textfield from "components/Form/Textfield/Textfield";
import { required } from "components/Form/validators";
import Error from "components/StyledElements/Error/Error";
import { GRAPHQL_API_ENDPOINT, TOKEN_KEY } from "config";
import React, { useCallback } from "react";
import cookie from "utils/Cookie";
import Style from "./style";

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
    <Style>
      <div className="wrapper">
        <Form onSubmit={handleSubmit}>
          <Textfield name="token" label="Token: " validators={[required]} />
          <Button>Login</Button>
        </Form>
      </div>
      {error && wasLoginAttempt && <Error>{error.message}</Error>}
    </Style>
  );
};

export default Authentication;
