import Form from "components/Form";
import MultiSelect from "components/Form/Select/MultiSelect";
import SingleSelect from "components/Form/Select/SingleSelect";
import Textfield from "components/Form/Textfield";
import { naturalNumber, required } from "components/Form/validators";
import React, { useCallback, useMemo } from "react";
import { DEFAULT_NAMESPACE_OPTION } from "../../Tap";

type Props = {
  namespaces: IstioNamespace | undefined;
  workloads: IstioWorkload | undefined;
  setFilters: (accessLogsInput: AccessLogsInput) => void;
  selectedNamesspaces: string[];
  setSelectedNamesspaces: React.Dispatch<React.SetStateAction<string[]>>;
};

const Filter = ({ namespaces, workloads, setFilters, selectedNamesspaces, setSelectedNamesspaces }: Props) => {
  const namespaceOptions = useMemo(() => {
    return namespaces
      ? namespaces.namespaces.map((namespace) => ({ label: namespace.name, value: namespace.name }))
      : [];
  }, [namespaces]);

  const resourceOptions = useMemo(() => {
    return workloads
      ? [
          ...selectedNamesspaces.map((namesspace) => ({ label: namesspace, value: namesspace })),
          ...workloads.workloads.map((workload) => ({ label: workload.name, value: workload.name })),
        ]
      : selectedNamesspaces.map((namesspace) => ({ label: namesspace, value: namesspace }));
  }, [workloads]);

  const handleChange = useCallback((value: any) => {
    console.log(value);
    setSelectedNamesspaces(value);
  }, []);

  return (
    <div>
      <Form>
        <MultiSelect
          name="namespaces"
          label="Namespaces"
          overRideValue={[DEFAULT_NAMESPACE_OPTION.value]}
          handleChange={handleChange}
          options={namespaceOptions}
        />
        <SingleSelect
          name="resource"
          label="Resource"
          options={resourceOptions}
          handleChange={handleChange}
          validators={[required]}
        />
        <SingleSelect
          name="destination"
          label="Destination"
          options={[
            { label: "GET", value: "GET" },
            { label: "POST", value: "POST" },
            { label: "PUT", value: "PUT" },
          ]}
          handleChange={handleChange}
          validators={[required]}
        />
        <SingleSelect
          name="method"
          label="method"
          options={[
            { label: "GET", value: "GET" },
            { label: "POST", value: "POST" },
            { label: "PUT", value: "PUT" },
          ]}
          handleChange={handleChange}
          validators={[required]}
        />
        <Textfield
          name="statusCodeMin"
          label="Status code: "
          handleChange={handleChange}
          validators={[naturalNumber]}
        />
        <Textfield name="statusCodeMax" label="" handleChange={handleChange} validators={[naturalNumber]} />
        <Textfield name="pathPrefix" label="Path prefix: " handleChange={handleChange} />
      </Form>
      <div>
        {workloads?.workloads.map((workload) => (
          <span key={workload.id}>{workload.name + " "}</span>
        ))}
      </div>
      <button onClick={() => setFilters({ method: "POST" })}>Set POST</button>
    </div>
  );
};

export default Filter;
