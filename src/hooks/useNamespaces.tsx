import { useLazyQuery } from "@apollo/react-hooks";
import { getNamespacesGQL } from "api/getNamespaces";
import { useEffect, useRef } from "react";

const useNamespaces = () => {
  const polling = useRef<any>();
  const [getNamespaces, { data: namespaces }] = useLazyQuery<IstioNamespace>(getNamespacesGQL, {
    variables: {},
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    getNamespaces();
    polling.current = setInterval(() => {
      getNamespaces();
    }, 5000);

    return () => {
      clearInterval(polling.current);
    };
  }, [getNamespaces]);

  return { namespaces };
};
export default useNamespaces;
