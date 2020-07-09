import React from "react";

const THead = ({ headerGroups }: any) => {
  return (
    <thead>
      {headerGroups.map((headerGroup: any) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any) => (
            <th {...column.getHeaderProps()}>
              <div className={`header cell${!column.Header ? " empty" : ""}`}>
                <div className="th-title">{column.render("Header")}</div>
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default THead;
