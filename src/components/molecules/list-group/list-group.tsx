import React from 'react'
import BaseListGroup, { ListGroupProps as BaseListGroupProps } from 'react-bootstrap/ListGroup'
import BaseListGroupItem, { ListGroupItemProps as BaseListGroupItemProps } from 'react-bootstrap/ListGroupItem'
import './list-group.styles.scss'

export interface ListGroupProps extends BaseListGroupProps {}
export interface ListGroupItemProps extends BaseListGroupItemProps {}

const ListGroup = (props: ListGroupProps) => <BaseListGroup {...props} />
export const ListGroupItem = (props: ListGroupItemProps) => <BaseListGroupItem {...props} />

ListGroup.Item = ListGroupItem

export default ListGroup
