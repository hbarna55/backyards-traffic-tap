import React, { Fragment } from "react";
import { Row } from "react-table";

type Props = {
  rows: Row<{}>[];
  getTableBodyProps: (props?: object) => object;
  prepareRow: (row: Row<{}>) => void;
};

const TBody = ({ rows, getTableBodyProps, prepareRow }: Props) => {
  return (
    <tbody {...getTableBodyProps()}>
      {rows.map((row: any) => {
        prepareRow(row);
        return (
          <Fragment key={row.index}>
            <tr {...row.getRowProps()}>
              {row.cells.map((cell: any) => {
                const CellFormat = cell.column.CellFormat ? cell.column.CellFormat : <div></div>;
                const cellValue = cell.value === null || typeof cell.value === "undefined" ? "" : cell.value;

                return (
                  <td {...cell.getCellProps()}>
                    <div className="body cell">
                      {cell.column.CellFormat
                        ? cell.render(<CellFormat {...{ cell, row }} column={cell.column} />)
                        : cellValue}
                    </div>
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
