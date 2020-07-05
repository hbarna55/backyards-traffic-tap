import { useLazyQuery } from "@apollo/react-hooks";
import { getUserGQL } from "api/getUser";
import Authentication from "components/Authentication/Authentication";
import Tap from "components/Tap/Tap";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [wasLoginAttempt, setLoginAttempt] = useState(false);
  const [testLogin, { data, error }] = useLazyQuery(getUserGQL, {
    variables: {},
  });

  useEffect(() => {
    testLogin();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {!data && error && (
        <Authentication
          testLogin={testLogin}
          error={error}
          wasLoginAttempt={wasLoginAttempt}
          setLoginAttempt={setLoginAttempt}
        />
      )}
      {data && !error && <Tap />}
    </div>
  );
};

export default Index;
