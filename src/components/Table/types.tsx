import { CellProps, Column as ReactTableColumn, Renderer, Row, UseExpandedRowProps } from "react-table"

export interface Column<D extends object = {}> extends ReactTableColumn<D> {
  CellFormat?: Renderer<CellProps<D>>
  Filter?: Function
  format?: Function
}

export type CellWithExpandedRow = { row: UseExpandedRowProps<Row> }
