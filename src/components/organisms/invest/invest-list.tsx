import React, {useEffect, useState} from 'react'
import Card from '@components/molecules/card'
import { useMediaQuery } from 'react-responsive'
import { StrategyType } from '../../../types/investment'
import Form from '@components/atoms/form/form'
import SearchForm from './search-form'
import Icon from "@components/atoms/icon";
import { Grid, List } from '@styled-icons/bootstrap'
import ListTable from './invest-table'
import InvestCards from './invest-cards'

export interface InvestListProps {
  strategies: StrategyType[]
  search?: string
}

export default function InvestList(props: InvestListProps) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })
  const { strategies } = props
  const [listView, setListView] = useState<boolean>(false)

  useEffect(() => {
    const listViewStorage = sessionStorage.getItem('investListView')
    if (listViewStorage) {
      setListView(listViewStorage !== 'false')
    } else {
      setListView(!isTabletOrMobile)
    }
  }, [])

  const initialValues: InvestListProps = {
    strategies,
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
      {({ values }) => (
        <>
          <Card className="border-0">
            <div className="card-header">
              <SearchForm />
              <div className="col-auto">
                <div className="nav btn-group">
                  <a
                    className={listView ? 'text-primary me-3' : 'text-light me-3'}
                    onClick={() => {
                      setListView(false)
                      sessionStorage.setItem('investListView', 'false');
                    }}
                  >
                    <Icon component={Grid} size={20} />
                  </a>
                  <a
                    className={!listView ? 'text-primary' : 'text-light'}
                    onClick={() =>  {
                      setListView(true)
                      sessionStorage.setItem('investListView', 'true');
                    }}
                  >
                    <Icon component={List} size={22} />
                  </a>
                </div>
              </div>
            </div>
            {listView ? <ListTable /> : null}
          </Card>
          {!listView ? <InvestCards /> : null}
        </>
      )}
    </Form>
  )
}
