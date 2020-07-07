import React from "react";
import { ColumnInstance, Row } from "react-table";
import styled from "styled-components";
import constants from "../constants";

type Props = {
  rows: Row<{}>[];
  flatColumns: ColumnInstance<{}>[];
  isLoading: boolean;
};

const NoData = ({ flatColumns, rows, isLoading }: Props) => {
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
