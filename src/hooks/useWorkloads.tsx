import { useQuery } from "@apollo/react-hooks";
import { getWorkloadsGQL } from "api/getWorkloads";

const useWorkloads = (workloadNamespaces: string[]) => {
  const { data: workloads } = useQuery<IstioWorkload>(getWorkloadsGQL, {
    variables: { namespaces: workloadNamespaces },
    pollInterval: 5000,
    fetchPolicy: "network-only",
  });

  return { workloads };
};
export default useWorkloads;
