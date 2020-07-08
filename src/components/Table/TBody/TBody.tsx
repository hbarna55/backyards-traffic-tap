import React, { Fragment } from "react";
import { Cell, Row } from "react-table";

type Props<T extends {}> = {
  rows: Row<T>[];
  getTableBodyProps: (props?: object) => object;
  prepareRow: (row: Row<T>) => void;
  rowCallback?: (row: T) => void;
};

const TBody = <T extends {}>({ rows, getTableBodyProps, prepareRow, rowCallback }: Props<T>) => {
  return (
    <tbody {...getTableBodyProps()}>
      {rows.map((row: Row<T>) => {
        prepareRow(row);
        return (
          <Fragment key={row.index}>
            <tr {...row.getRowProps()} onClick={() => rowCallback && rowCallback(row.original)}>
              {row.cells.map((cell: Cell<T>) => {
                const cellValue = cell.value === null || typeof cell.value === "undefined" ? "" : cell.value;

                return (
                  <td {...cell.getCellProps()}>
                    <div className="body cell">{cellValue}</div>
                  </td>
                );
              })}
            </tr>
          </Fragment>
        );
      })}
    </tbody>
  );
};

export default TBody;
