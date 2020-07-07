import React from "react";
import constants from "../constants";

const THead = ({ headerGroups }: any) => {
  return (
    <thead>
      {headerGroups.map((headerGroup: any, index: any) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any) => (
            <th
              {...column.getHeaderProps()}
              style={{ top: index * parseInt(constants.trHeight) + constants.trHeight.replace(/\d*/, "") }}
            >
              <div className={`header cell${!column.Header ? " empty" : ""}${column.canFilter ? " filter" : ""}`}>
                <div className="th-title">{column.render("Header")}</div>
                {column.canFilter && column.Header ? <div className="th-input">{column.render("Filter")}</div> : null}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default THead;
