import React, {useEffect, useState} from 'react'
import Card from '@components/molecules/card'
import { useMediaQuery } from 'react-responsive'
import { investmentStrategies } from '@config/investment/strategies'
import Form from '@components/atoms/form/form'
import SearchForm from './search-form'
import Icon from "@components/atoms/icon";
import { Grid, List } from '@styled-icons/bootstrap'
import ListTable from './invest-table'
import InvestCards from './invest-cards'

export default function InvestList() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })
  const [listView, setListView] = useState<boolean>(false)

  useEffect(() => {
    const listViewStorage = sessionStorage.getItem('investListView')
    if (listViewStorage) {
      setListView(listViewStorage !== 'false')
    } else {
      setListView(!isTabletOrMobile)
    }
  }, [])

  const initialValues = {
    strategies: investmentStrategies,
    search: ''
  }

  const handleSubmit = () => {}

  // @ts-ignore
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {() => (
        <>
          <div className="d-flex justify-content-end mb-5">
            <div className="me-4">
              <SearchForm />
            </div>
            <div className="d-flex align-items-center">
              <a className={listView ? 'text-primary me-3' : 'text-light me-3'}
                  onClick={() => {
                    setListView(false)
                    sessionStorage.setItem('investListView', 'false');
                  }}>
                <Icon component={Grid} size={20} />
              </a>
              <a className={!listView ? 'text-primary' : 'text-light'}
                  onClick={() =>  {
                    setListView(true)
                    sessionStorage.setItem('investListView', 'true');
                  }}>
                <Icon component={List} size={22} />
              </a>
            </div>
          </div>
          {listView ? <Card><ListTable /></Card> : null}
          {!listView ? <InvestCards /> : null}
        </>
      )}
    </Form>
  )
}
