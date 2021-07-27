import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import BlurBackground from '@components/atoms/blur-background'
import { useMediaQuery } from 'react-responsive'
import InvestListItem from '@components/organisms/invest/invest-list-item'
import InvestListItemHeader from '@components/organisms/invest/invest-list-item-header'
import InvestCard from '@components/organisms/invest/invest-card'
import InvestListSearch from './invest-list-search'
import { InvestListContext } from '../../../../context/invest-list-context'
import Button from '@components/atoms/button'
import { List,  GridFill } from '@styled-icons/bootstrap'
import Icon from "@components/atoms/icon";

const StyledButton = styled(Button)`
    &:focus {
        background-color: transparent;
        outline: 0!important;
    }
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0;
    }
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
`

const InvestList = () => {

    const {
        items
    } = useContext(InvestListContext)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const [listView, setListView] = useState<boolean>(true)
    const InvestItemComponent = (listView && !isTabletOrMobile) ? InvestListItem : InvestCard

    return (
        <>
            <div className="row mb-5">
                <div className="col">
                    <InvestListSearch />
                </div>
                {((!isTabletOrMobile) &&
                    <div className="col-auto">
                        <div className="nav btn-group">
                            <StyledButton
                                variant="light"
                                className={listView ? 'btn-lg' : 'bg-dark btn-lg'}
                                onClick={() => setListView(false)}
                            >
                                <Icon component={GridFill} size={20} />
                            </StyledButton>
                            <StyledButton
                                variant="light"
                                className={!listView ? 'btn-lg' : 'bg-dark btn-lg'}
                                onClick={() => setListView(true)}
                            >
                                <Icon component={List} size={20} />
                            </StyledButton>
                        </div>
                    </div>
                )}
            </div>


            {((!isTabletOrMobile && listView) &&
                <InvestListItemHeader />
            )}

            <div className="row position-relative">
                <BlurBackground />
                {items.map((data, key) => (
                    <div key={key} style={{zIndex: 1}} className={listView ? 'col-12' : 'col-md-4'}>
                        <InvestItemComponent
                            { ...data }
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default InvestList
