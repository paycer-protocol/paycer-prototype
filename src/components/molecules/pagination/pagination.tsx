import React from 'react'
import BasePagination, { PaginationProps as BasePaginationProps } from 'react-bootstrap/Pagination'
import BasePageItem, { Ellipsis, First, Last, Next, Prev } from 'react-bootstrap/PageItem'

export interface PaginationProps extends BasePaginationProps {}

export interface PageItemProps {
  active?: boolean
  disabled?: boolean
  children?: any
}

const Pagination = (props: PaginationProps) => <BasePagination {...props} />
export const PageItem = ({ children, ...props }: PageItemProps) => (
  <BasePageItem {...props}>{children}</BasePageItem>
)

Pagination.Item = PageItem
Pagination.Ellipsis = Ellipsis
Pagination.First = First
Pagination.Last = Last
Pagination.Next = Next
Pagination.Prev = Prev

export default Pagination
