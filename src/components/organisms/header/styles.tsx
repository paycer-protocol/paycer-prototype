import styled, { css } from 'styled-components'
import Navbar from "@components/molecules/navbar";

export const StyledBrand = styled(Navbar.Brand)`
    margin-top: -10px;

    img {
      max-height: 40px;
    }

    @media screen and (max-width: 768px) {
        img {
          max-height: 26px;
        }
    }
`

export const StyledLogo = styled.a`
    order: 1;
    @media screen and (max-width: 768px) {
      position: absolute;
      top: 17px;
      left: 15px;
    }
`

export const DemoBadge = styled.div`
    position: absolute;
    transform: rotate(48deg);
    right: -89px;
    top: 13px;
    line-height: 25px;
    font-size: 11px;
    width: 222px;
    padding-left: 3px;
    text-align: center;
    font-weight: 500;
    color: white;
    text-shadow: rgb(0 0 0) -1px 1px 7px;
    height: 19px;
    justify-content: center;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    background: linear-gradient(101deg,#ca3dbf,#c3cef7);
    letter-spacing: 0.1px;
`