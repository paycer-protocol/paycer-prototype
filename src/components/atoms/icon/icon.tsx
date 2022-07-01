import React from 'react';
import { StyledIcon, StyledIconProps } from '@styled-icons/styled-icon';

export interface IconProps extends StyledIconProps {
  component: StyledIcon
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ component, children, ...restProps }) => {
  const IconComponent = component;

  return (
    <IconComponent {...restProps}>
      {children}
    </IconComponent>
  );
};

export default Icon;
