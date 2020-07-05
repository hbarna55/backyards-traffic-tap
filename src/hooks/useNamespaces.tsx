import { useLazyQuery } from "@apollo/react-hooks";
import { getNamespacesGQL } from "api/getNamespaces";
import usePolling from "hooks/usePolling";

const useNamespaces = () => {
  const [getNamespaces, { data: namespaces }] = useLazyQuery<IstioNamespace>(getNamespacesGQL, {
    variables: {},
    fetchPolicy: "network-only",
  });

  usePolling(getNamespaces);

  return { namespaces };
};
export default useNamespaces;
