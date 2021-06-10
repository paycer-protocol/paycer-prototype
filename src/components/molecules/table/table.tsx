import React from 'react'
import BaseTable, { TableProps as BaseTableProps } from 'react-bootstrap/Table'
import './table.styles.scss'

export interface TableProps extends BaseTableProps {}

const Table = (props: TableProps) => <BaseTable {...props} />

export default Table
