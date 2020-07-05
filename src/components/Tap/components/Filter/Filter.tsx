import React from "react";

type Props = {
  namespaces: IstioNamespace | undefined;
  setFilters: React.Dispatch<React.SetStateAction<AccessLogsInput>>;
};

const Filter = ({ namespaces, setFilters }: Props) => {
  return (
    <div>
      <div>Filter</div>
      <div>
        {namespaces?.namespaces.map((namespace) => (
          <span key={namespace.id}>{namespace.name + " "}</span>
        ))}
      </div>
      <button onClick={() => setFilters({ method: "POST" })}>Set POST</button>
    </div>
  );
};

export default Filter;
