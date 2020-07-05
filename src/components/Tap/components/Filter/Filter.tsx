import React from "react";

type Props = {
  setFilters: React.Dispatch<React.SetStateAction<AccessLogsInput>>;
};

const Filter = ({ setFilters }: Props) => {
  return (
    <div>
      <div>Filter</div>
      <button onClick={() => setFilters({ method: "POST" })}>Set POST</button>
    </div>
  );
};

export default Filter;
