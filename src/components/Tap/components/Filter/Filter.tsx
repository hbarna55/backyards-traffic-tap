import React from "react";

type Props = {
  namespaces: IstioNamespace | undefined;
  workloads: IstioWorkload | undefined;
  setFilters: React.Dispatch<React.SetStateAction<AccessLogsInput>>;
};

const Filter = ({ namespaces, workloads, setFilters }: Props) => {
  return (
    <div>
      <div>Filter</div>
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
