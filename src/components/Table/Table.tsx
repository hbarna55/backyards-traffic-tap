import { Column } from "components/Table/types";
import React, { useCallback, useMemo } from "react";
import {
  Row,
  useExpanded,
  useFilters,
  UseFiltersColumnProps,
  usePagination,
  UsePaginationInstanceProps,
  useSortBy,
  useTable,
  UseTableInstanceProps,
} from "react-table";
import NoData from "./NoData/NoData";
import Styles from "./styles";
import TBody from "./TBody/TBody";
import THead from "./THead/THead";

type Props<T extends {}> = {
  columns: Array<Column<T>>;
  data: Array<T>;
  isLoading: boolean;
  renderRowSubComponent?: (row: Row) => JSX.Element;
  id?: string;
  defaultSort?: { id: string; desc: boolean };
};

type CellValue = {
  name: string;
  id?: string;
};

const Table = <T extends {}>({ columns, data, isLoading, id }: Props<T>) => {
  const convertRowValues = useCallback((elems: string | Array<CellValue>) => {
    return Array.isArray(elems) ? elems.map((elem: CellValue) => elem.name).join("") : elems;
  }, []);

  const Filter = useCallback(
    ({ column: { filterValue, setFilter } }: { column: Column & UseFiltersColumnProps<object> }) => (
      <input
        placeholder="search..."
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value || undefined)}
        className="search"
      />
    ),
    [],
  );
  const filter = useCallback(
    (rows, id, filterValue) => {
      rows = rows.filter((row: Row) => {
        const rowValue = row.values[id];
        return String(convertRowValues(rowValue)).toLowerCase().includes(String(filterValue).toLowerCase());
      });
      return rows;
    },
    [convertRowValues],
  );

  const defaultColumn: Column<T> = useMemo(() => ({ Filter, filter }), [Filter, filter]);
  const defaultData: Array<T> = useMemo((): Array<T> => (data instanceof Array ? data : []), [data]);

  /* prettier-ignore */
  const {
    getTableProps, getTableBodyProps, headerGroups, flatColumns, prepareRow, rows,
  } = (useTable(
    {
      columns: columns,
      data: defaultData,
      defaultColumn,
      initialState: {
        pageIndex: 0,
      },
    },
    useFilters,
    useSortBy,
    useExpanded, 
    usePagination,
  ) as any) as UseTableInstanceProps<object> &
    UsePaginationInstanceProps<object>

  return (
    <Styles>
      <div id={id} className="table-wrapper">
        <table {...getTableProps()}>
          <THead {...{ headerGroups }} />
          <TBody {...{ rows, getTableBodyProps, prepareRow }} />
          <NoData {...{ rows, flatColumns, isLoading }} />
        </table>
      </div>
    </Styles>
  );
};

export default Table;
