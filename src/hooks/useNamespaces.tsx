import { useQuery } from "@apollo/react-hooks";
import { getNamespacesGQL } from "api/getNamespaces";

const useNamespaces = () => {
  const { data: namespaces } = useQuery<IstioNamespace>(getNamespacesGQL, {
    variables: {},
    pollInterval: 5000,
    fetchPolicy: "network-only",
  });

  return { namespaces };
};
export default useNamespaces;
