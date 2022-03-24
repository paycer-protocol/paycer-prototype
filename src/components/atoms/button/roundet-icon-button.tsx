import React, {useEffect, useRef, useState} from 'react'
import styled, { css } from 'styled-components'
import Icon from "@components/atoms/icon";
import {StyledIcon} from "@styled-icons/styled-icon";

export const IconButton = styled.div`
   ${props => props.isActive && css`
    background: linear-gradient(86deg,rgba(133,12,167,1) 0%,rgba(66,1,220,1) 100%)!important;
  `}
    border-radius: 25px;
    flex-direction: row;
    padding: 0 15px;
    padding-top: 1px;
    height: 47px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg { 
        color: #FFFFFF; cursor: pointer;
        &:hover {
            color: #a6a6a6;
        }
    }
`

export const Label = styled.div`
    margin-left: 15px;
    cursor: pointer;
`

export interface RoundetIconButtonProps {
    icon: StyledIcon
    label?: string
    toggleActive?: boolean
}

const RoundetIconButton = (props: RoundetIconButtonProps) => {

    const {
        icon,
        label,
        toggleActive
    } = props

    const buttonRef = useRef(null)
    const [isActive, setIsActive] = useState<boolean>(false)

    useEffect(() => {
        if (toggleActive) {
            document.addEventListener('click', function(e) {
                // @ts-ignore
                if (!e?.path.includes(buttonRef.current)) {
                    setIsActive(false)
                }
            })
        }
    }, [])

    return (
        <IconButton ref={buttonRef} onClick={toggleActive ? () => setIsActive((!isActive)) : null} className="card mb-0 bg-dark" isActive={isActive}>
            <Icon component={icon} size={20} />
            {label &&
                <Label>{label}</Label>
            }
        </IconButton>
    )
}

export default RoundetIconButton
