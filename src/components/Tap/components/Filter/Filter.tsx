import Form from "components/Form";
import Textfield from "components/Form/Textfield";
import { required } from "components/Form/validators";
import React from "react";

type Props = {
  namespaces: IstioNamespace | undefined;
  workloads: IstioWorkload | undefined;
  setFilters: (accessLogsInput: AccessLogsInput) => void;
};

const Filter = ({ namespaces, workloads, setFilters }: Props) => {
  return (
    <div>
      <div>Filter</div>
      <Form>
        <Textfield name="token" label="Token: " validators={[required]} />
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
