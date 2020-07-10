import { useLazyQuery } from "@apollo/react-hooks";
import { getUserGQL } from "api/getUser";
import Authentication from "components/Authentication/Authentication";
import Tap from "components/Tap/Tap";
import { TapFilterContextProvider } from "context/TapFilter";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [wasLoginAttempt, setLoginAttempt] = useState(false);
  const [testLogin, { data, error }] = useLazyQuery(getUserGQL, {
    variables: {},
  });

  useEffect(() => {
    testLogin();
  }, [testLogin]);

  return (
    <div>
      {(!data || error) && (
        <Authentication
          testLogin={testLogin}
          error={error}
          wasLoginAttempt={wasLoginAttempt}
          setLoginAttempt={setLoginAttempt}
        />
      )}
      {data && !error && (
        <TapFilterContextProvider>
          <Tap />
        </TapFilterContextProvider>
      )}
    </div>
  );
};

export default Index;
