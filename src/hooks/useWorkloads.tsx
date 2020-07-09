import { useQuery } from "@apollo/react-hooks";
import { getWorkloadsGQL } from "api/getWorkloads";

const useWorkloads = () => {
  const { data: workloads } = useQuery<IstioWorkload>(getWorkloadsGQL, {
    variables: { namespaces: ["default", "backyards-demo"] },
    pollInterval: 5000,
    fetchPolicy: "network-only",
  });

  return { workloads };
};
export default useWorkloads;
