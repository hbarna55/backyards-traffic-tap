import { QueryLazyOptions } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ApolloError } from "apollo-boost";
import Alert from "components/StyledElements/Alert/Alert";
import { GRAPHQL_API_ENDPOINT, TOKEN_KEY } from "config";
import React, { useCallback, useMemo, useState } from "react";
import cookie from "utils/Cookie";
import { Required } from "utils/Validators";
import Style from "./style";

type Props = {
  testLogin: (options?: QueryLazyOptions<{ language: string }> | undefined) => void;
  error: ApolloError | undefined;
  loading: boolean;
  wasLoginAttempt: boolean;
  setLoginAttempt: React.Dispatch<React.SetStateAction<boolean>>;
};

const Authentication = ({ testLogin, error, loading, wasLoginAttempt, setLoginAttempt }: Props) => {
  const [token, setToken] = useState("");
  const [tokenError, setTokenError] = useState("");
  const tokenValidator = useMemo(() => new Required(), []);

  const handleSubmit = useCallback(() => {
    if (tokenValidator.validate(token)) {
      setTokenError(tokenValidator.showMessage());
      return;
    }
    cookie.save(TOKEN_KEY, token, GRAPHQL_API_ENDPOINT);
    testLogin();
    setLoginAttempt(true);
  }, [token, testLogin, setLoginAttempt, tokenValidator]);

  return (
    <Style>
      <div className="wrapper">
        <form>
          <TextField
            fullWidth
            label="Token"
            error={tokenValidator.isError()}
            helperText={tokenError}
            onChange={(event) => {
              setToken(event.target.value);
              tokenValidator.validate(event.target.value);
              setTokenError(tokenValidator.showMessage());
            }}
            disabled={loading}
          />
          <Button onClick={handleSubmit} disabled={loading} variant="contained" color="primary">
            Login
          </Button>
        </form>
      </div>
      {error && wasLoginAttempt && (
        <Alert severity="error" variant="filled">
          {error.message}
        </Alert>
      )}
    </Style>
  );
};

export default Authentication;
