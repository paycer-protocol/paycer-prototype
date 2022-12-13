import styled, { css } from 'styled-components'

interface NftRarityColorBadgeProps {
  color: string
}

export default styled.div<NftRarityColorBadgeProps>`
  ${(props) => props.color && css`
    background: ${props.color};
  `}
  border-radius: 50%;
  width: 13px;
  height: 13px;
`
