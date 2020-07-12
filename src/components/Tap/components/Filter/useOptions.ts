import { TapFilterContext } from "context/TapFilter";
import { useContext, useMemo } from "react";

const useOptions = (namespaces: IstioNamespace | undefined, workloads: IstioWorkload | undefined) => {
  const { namespacesFilter } = useContext(TapFilterContext);

  const namespaceOptions = useMemo(() => {
    return namespaces
      ? namespaces.namespaces.map((namespace) => ({ label: namespace.name, value: namespace.name }))
      : [];
  }, [namespaces]);

  const resourceOptions = useMemo(() => {
    return workloads
      ? [
          ...namespacesFilter.get.map((namespaces) => ({ label: namespaces, value: namespaces })),
          ...workloads.workloads.map((workload) => {
            const nameWithNamespace = `${workload.namespace}/${workload.name}`;
            return {
              label: nameWithNamespace,
              value: nameWithNamespace,
            };
          }),
        ]
      : namespacesFilter.get.map((namespaces) => ({ label: namespaces, value: namespaces }));
  }, [workloads, namespacesFilter.get]);

  const mathodOptions = useMemo(
    () => [
      { label: "GET", value: "GET" },
      { label: "POST", value: "POST" },
      { label: "PUT", value: "PUT" },
    ],
    [],
  );

  return {
    namespaceOptions,
    resourceOptions,
    mathodOptions,
  };
};

export default useOptions;
