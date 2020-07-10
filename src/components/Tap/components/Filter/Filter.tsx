import Form from "components/Form/Form";
import MultiSelect from "components/Form/Select/MultiSelect/MultiSelect";
import SingleSelect from "components/Form/Select/SingleSelect/SingleSelect";
import Textfield from "components/Form/Textfield/Textfield";
import { naturalNumber, required } from "components/Form/validators";
import { DEFAULT_NAMESPACE_OPTION, TapFilterContext } from "context/TapFilter";
import React, { useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import useFilters from "./useFilters";

type Props = {
  namespaces: IstioNamespace | undefined;
  workloads: IstioWorkload | undefined;
  filters: AccessLogsInput;
  setFilters: (accessLogsInput: AccessLogsInput) => void;
};

const Filter = ({ namespaces, workloads, filters, setFilters }: Props) => {
  const { namespaces: namespacesFilter } = useContext(TapFilterContext);
  const { setResource, setDestination, setMethod, setStatusCodeMin, setStatusCodeMax, setPathPrefix } = useFilters(
    filters,
    setFilters,
  );
  const namespaceOptions = useMemo(() => {
    return namespaces
      ? namespaces.namespaces.map((namespace) => ({ label: namespace.name, value: namespace.name }))
      : [];
  }, [namespaces]);

  const resourceOptions = useMemo(() => {
    return workloads
      ? [
          ...namespacesFilter.get.map((namesspace) => ({ label: namesspace, value: namesspace })),
          ...workloads.workloads.map((workload) => {
            const nameWithNamespace = `${workload.namespace}/${workload.name}`;
            return {
              label: nameWithNamespace,
              value: nameWithNamespace,
            };
          }),
        ]
      : namespacesFilter.get.map((namesspace) => ({ label: namesspace, value: namesspace }));
  }, [workloads, namespacesFilter.get]);

  const setNamespaces = useCallback(
    (value: any) => {
      namespacesFilter.set(value);
    },
    [namespacesFilter],
  );

  return (
    <Style>
      <Form>
        <MultiSelect
          name="namespaces"
          label="Namespaces"
          overRideValue={[DEFAULT_NAMESPACE_OPTION.value]}
          handleChange={setNamespaces}
          options={namespaceOptions}
        />
        <SingleSelect
          name="resource"
          label="Resource"
          options={resourceOptions}
          handleChange={setResource}
          validators={[required]}
        />
        <SingleSelect
          name="destination"
          label="Destination"
          options={resourceOptions}
          handleChange={setDestination}
          validators={[required]}
        />
        <SingleSelect
          name="method"
          label="Method"
          options={[
            { label: "GET", value: "GET" },
            { label: "POST", value: "POST" },
            { label: "PUT", value: "PUT" },
          ]}
          handleChange={setMethod}
          validators={[required]}
        />
        <div className="statusCode">
          <Textfield
            name="statusCodeMin"
            label="Status code: "
            handleChange={setStatusCodeMin}
            validators={[naturalNumber]}
          />
          <div></div>
          <Textfield name="statusCodeMax" label="" handleChange={setStatusCodeMax} validators={[naturalNumber]} />
        </div>
        <Textfield name="pathPrefix" label="Path prefix: " handleChange={setPathPrefix} />
      </Form>
    </Style>
  );
};

const Style = styled.div`
  form {
    padding: 0.5rem;
    display: grid;
    grid-gap: 0.6rem;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(1, 1fr);

    .react-select__menu {
      z-index: 2;
    }

    .statusCode {
      display: grid;
      grid-template-columns: 1fr 20px 1fr;
      grid-template-rows: repeat(1, 1fr);
    }
  }
`;

export default Filter;
