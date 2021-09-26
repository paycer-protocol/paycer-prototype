import styled from 'styled-components'

export const Toolbar = styled.div`
    margin-bottom: 30px;
    display: flex;
    justify-content: flex-end;
    button {
      border: 1px solid #FFFFFF;
      border-radius: 20px;
      background: transparent;
      padding: 0 20px;
      color: #FFFFFF;
      font-size: 14px;
      margin-left: 6px;
      &.active {
        background: linear-gradient(86deg,rgba(133,12,167,1) 0%,rgba(66,1,220,1) 100%);
        border: 0 none;
      }
    }
    
`

