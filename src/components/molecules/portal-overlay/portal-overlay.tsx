import React from 'react';
import styled from 'styled-components';
import Portal from '@components/atoms/portal';

/**
 * z-index is intentionally below any of Bootstrap's components.
 *
 * @see https://getbootstrap.com/docs/5.0/layout/z-index
 */
const StyledPortal = styled.div`
    z-index: 990;
    background: rgba(0, 0, 0, 0.85);
    border-radius: 5px;
    left: 1rem;
    bottom: 1rem;
    padding: 0.25rem 0.5rem;
`;

interface PortalOverlayProps {
  children: any
}

/**
 * Generic portal overlay aligned to screen corner.
 */
const PortalOverlay: React.FC<PortalOverlayProps> = (props: PortalOverlayProps) => {
  const { children } = props;

  return (
    <Portal>
      <StyledPortal className="position-fixed">
        {children}
      </StyledPortal>
    </Portal>
  );
};

export default PortalOverlay;
