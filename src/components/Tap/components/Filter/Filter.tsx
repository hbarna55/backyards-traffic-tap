import Form from "components/Form";
import MultiSelect from "components/Form/Select/MultiSelect";
import SingleSelect from "components/Form/Select/SingleSelect";
import Textfield from "components/Form/Textfield";
import { naturalNumber, required } from "components/Form/validators";
import React from "react";

type Props = {
  namespaces: IstioNamespace | undefined;
  workloads: IstioWorkload | undefined;
  setFilters: (accessLogsInput: AccessLogsInput) => void;
};

const Filter = ({ namespaces, workloads, setFilters }: Props) => {
  return (
    <div>
      <Form>
        <Textfield name="pathPrefix" label="Path prefix: " />
        <Textfield name="statusCodeMin" label="Status code: " validators={[naturalNumber]} />
        <Textfield name="statusCodeMax" label="" validators={[naturalNumber]} />
        <SingleSelect
          name="method"
          label="method"
          options={[
            { label: "GET", value: "GET" },
            { label: "POST", value: "POST" },
            { label: "PUT", value: "PUT" },
          ]}
          validators={[required]}
        />
        <MultiSelect
          name="namespaces"
          label="namespaces"
          options={[
            { label: "namespace1", value: "namespace1" },
            { label: "namespace2", value: "namespace2" },
            { label: "namespace3", value: "namespace3" },
          ]}
        />
      </Form>
      <div>
        {namespaces?.namespaces.map((namespace) => (
          <span key={namespace.id}>{namespace.name + " "}</span>
        ))}
      </div>
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
