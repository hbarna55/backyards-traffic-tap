import { useCallback } from "react";

const useFilters = (filters: AccessLogsInput, setFilters: (accessLogsInput: AccessLogsInput) => void) => {
  const setResource = useCallback(
    (value: any) => {
      if (!value) {
        const newFilter = { ...filters };
        delete newFilter.reporterNamespace;
        delete newFilter.reporterType;
        delete newFilter.reporterName;
        setFilters(newFilter);
        return;
      }
      const [namespace, workload] = value.value.split("/");
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
    [setFilters, filters],
  );
  const setDestination = useCallback(
    (value: any) => {
      if (!value) {
        const newFilter = { ...filters };
        delete newFilter.destinationNamespace;
        delete newFilter.destinationType;
        delete newFilter.destinationName;
        setFilters(newFilter);
        return;
      }
      const [namespace, workload] = value.value.split("/");
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
    [setFilters, filters],
  );
  const setMethod = useCallback(
    (value: any) => {
      if (value) {
        setFilters({ ...filters, method: value?.value });
      } else {
        const newFilter = { ...filters };
        delete newFilter.method;
        setFilters(newFilter);
      }
    },
    [setFilters, filters],
  );
  const setStatusCodeMin = useCallback(
    (value: any) => {
      if (value) {
        setFilters({ ...filters, statusCode: { ...filters.statusCode, min: value } });
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
    [setFilters, filters],
  );
  const setStatusCodeMax = useCallback(
    (value: any) => {
      if (value) {
        setFilters({ ...filters, statusCode: { ...filters.statusCode, max: value } });
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
    [setFilters, filters],
  );
  const setPathPrefix = useCallback(
    (value: any) => {
      if (value) {
        setFilters({ ...filters, path: value });
      } else {
        const newFilter = { ...filters };
        delete newFilter.path;
        setFilters(newFilter);
      }
    },
    [setFilters, filters],
  );

  return {
    setResource,
    setDestination,
    setMethod,
    setStatusCodeMin,
    setStatusCodeMax,
    setPathPrefix,
  };
};

export default useFilters;
