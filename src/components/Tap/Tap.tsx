import React from "react";
import Details from "./components/Details/Details";
import Filter from "./components/Filter/Filter";
import Table from "./components/Table/Table";
import { StyledTap } from "./style";

const Tap = () => {
  return (
    <StyledTap>
      <div className="filter">
        <Filter />
      </div>
      <div className="table">
        <Table />
      </div>
      <div className="details">
        <Details />
      </div>
    </StyledTap>
  );
};

export default Tap;
