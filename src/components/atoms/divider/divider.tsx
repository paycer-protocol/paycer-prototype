import React, { ReactElement } from 'react';
import './divider.styles.scss';

export interface DividerProps {
  children?: ReactElement | string | number | null,
}

const Divider = ({ children }: DividerProps) => (
  <div className="divider">
    <h3 className="divider-content divider-heading">
      {children}
    </h3>
  </div>
);

export default Divider;
