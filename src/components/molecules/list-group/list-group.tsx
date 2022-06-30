import React from 'react';
import BaseListGroup, { ListGroupProps as BaseListGroupProps } from 'react-bootstrap/ListGroup';
import BaseListGroupItem, { ListGroupItemProps as BaseListGroupItemProps } from 'react-bootstrap/ListGroupItem';

export interface ListGroupProps extends BaseListGroupProps {
  children: any
}

export interface ListGroupItemProps extends BaseListGroupItemProps {
  children: any
}

const ListGroup = ({ children, ...props }: ListGroupProps) => (
  <BaseListGroup {...props}>
    {children}
  </BaseListGroup>
);
export const ListGroupItem = ({ children, ...props }: ListGroupItemProps) => (
  <BaseListGroupItem {...props}>
    {children}
  </BaseListGroupItem>
);

ListGroup.Item = ListGroupItem;

export default ListGroup;
