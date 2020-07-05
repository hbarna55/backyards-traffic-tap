import { useLazyQuery } from "@apollo/react-hooks";
import { getWorkloadsGQL } from "api/getWorkloads";
import usePolling from "hooks/usePolling";

const useWorkloads = () => {
  const [getWorkloads, { data: workloads }] = useLazyQuery<IstioWorkload>(getWorkloadsGQL, {
    variables: { namespaces: ["default", "backyards-demo"] },
    fetchPolicy: "network-only",
  });

  usePolling(getWorkloads);

  return { workloads };
};
export default useWorkloads;
