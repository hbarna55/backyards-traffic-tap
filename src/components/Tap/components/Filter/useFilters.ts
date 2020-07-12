import { TapFilterContext } from "context/TapFilter";
import { useCallback, useContext } from "react";

const useFilters = (filters: AccessLogsInput, setFilters: (accessLogsInput: AccessLogsInput) => void) => {
  const {
    namespacesFilter,
    resourceFilter,
    destinationFilter,
    methodFilter,
    statusCodeMinFilter,
    statusCodeMaxFilter,
    pathPrefixFilter,
  } = useContext(TapFilterContext);

  const setNamespaces = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const value = event.target.value as string[];
      if (value.length < 1) return;
      namespacesFilter.set(value);
    },
    [namespacesFilter],
  );

  const setResource = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const value = event.target.value as string;
      resourceFilter.set(value);

      if (!value) {
        const newFilter = { ...filters };
        delete newFilter.reporterNamespace;
        delete newFilter.reporterType;
        delete newFilter.reporterName;
        setFilters(newFilter);
        return;
      }
      const [namespace, workload] = value.split("/");
      const newFilterWithNs = { ...filters, reporterNamespace: namespace };
      if (!workload) {
        delete newFilterWithNs.reporterType;
        delete newFilterWithNs.reporterName;
        setFilters(newFilterWithNs);
        return;
      }
      const newFilterWithNsAndW: AccessLogsInput = {
        ...newFilterWithNs,
        reporterType: "WORKLOAD",
        reporterName: workload,
      };
      setFilters(newFilterWithNsAndW);
    },
    [setFilters, filters, resourceFilter],
  );

  const setDestination = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const value = event.target.value as string;
      destinationFilter.set(value);

      if (!value) {
        const newFilter = { ...filters };
        delete newFilter.destinationNamespace;
        delete newFilter.destinationType;
        delete newFilter.destinationName;
        setFilters(newFilter);
        return;
      }
      const [namespace, workload] = value.split("/");
      const newFilterWithNs = { ...filters, destinationNamespace: namespace };
      if (!workload) {
        delete newFilterWithNs.destinationType;
        delete newFilterWithNs.destinationName;
        setFilters(newFilterWithNs);
        return;
      }
      const newFilterWithNsAndW: AccessLogsInput = {
        ...newFilterWithNs,
        destinationType: "WORKLOAD",
        destinationName: workload,
      };
      setFilters(newFilterWithNsAndW);
    },
    [setFilters, filters, destinationFilter],
  );
  const setMethod = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const value = event.target.value as RequestMethodes;
      methodFilter.set(value);

      if (value) {
        setFilters({ ...filters, method: value });
      } else {
        const newFilter = { ...filters };
        delete newFilter.method;
        setFilters(newFilter);
      }
    },
    [setFilters, filters, methodFilter],
  );
  const setStatusCodeMin = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const value = event.target.value as string;
      statusCodeMinFilter.set(value);

      if (value) {
        setFilters({ ...filters, statusCode: { ...filters.statusCode, min: Number(value) } });
      } else {
        const newFilter = { ...filters };
        if (!newFilter.statusCode?.max) {
          setFilters({ ...newFilter });
        } else {
          const statusCode = { ...filters.statusCode };
          delete statusCode?.min;
          setFilters({ ...newFilter, statusCode: { ...statusCode } });
        }
      }
    },
    [setFilters, filters, statusCodeMinFilter],
  );
  const setStatusCodeMax = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const value = event.target.value as string;
      statusCodeMaxFilter.set(value);

      if (value) {
        setFilters({ ...filters, statusCode: { ...filters.statusCode, max: Number(value) } });
      } else {
        const newFilter = { ...filters };
        if (!newFilter.statusCode?.min) {
          setFilters({ ...newFilter });
        } else {
          const statusCode = { ...filters.statusCode };
          delete statusCode?.max;
          setFilters({ ...newFilter, statusCode: { ...statusCode } });
        }
      }
    },
    [setFilters, filters, statusCodeMaxFilter],
  );
  const setPathPrefix = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const value = event.target.value as string;
      pathPrefixFilter.set(value);

      if (value) {
        setFilters({ ...filters, path: value });
      } else {
        const newFilter = { ...filters };
        delete newFilter.path;
        setFilters(newFilter);
      }
    },
    [setFilters, filters, pathPrefixFilter],
  );

  return {
    setNamespaces,
    setResource,
    setDestination,
    setMethod,
    setStatusCodeMin,
    setStatusCodeMax,
    setPathPrefix,
  };
};

export default useFilters;
