import React from "react";
import { ColumnInstance, Row } from "react-table";
import styled from "styled-components";
import constants from "../constants";

type Props<T extends {}> = {
  rows: Row<T>[];
  flatColumns: ColumnInstance<T>[];
  isLoading: boolean;
};

const NoData = <T extends {}>({ flatColumns, rows, isLoading }: Props<T>) => {
  return rows.length === 0 ? (
    <tfoot>
      <tr>
        <td colSpan={flatColumns.length}>
          <NoDataDiv className="no-data">
            {isLoading ? "Loading..." : "No data tapped with this filter set yet."}
          </NoDataDiv>
        </td>
      </tr>
    </tfoot>
  ) : null;
};

const NoDataDiv = styled.div`
  background-color: ${constants.backgroundColor};
  margin: 0;
  padding: ${constants.cellPadding};
  text-align: center;
`;

export default NoData;
