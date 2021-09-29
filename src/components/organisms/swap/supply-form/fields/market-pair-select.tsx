import React from 'react'
import * as Styles from '../../Styles'
import { useFormikContext, Field } from 'formik'
import { SupplyProps } from '../types'
import supplyMarketPairs from '@config/supply-market-pairs'
import SearchableSelect from '@components/atoms/form/searchable-select'
import {t} from "@lingui/macro";

export default function MarketPairSelect() {
    const { values, setFieldValue } = useFormikContext<SupplyProps>()
    const options = []

    {Object.keys(supplyMarketPairs).map((key) => (
        options.push({value: supplyMarketPairs[key], label: `${supplyMarketPairs[key].pairs[0].symbol} / ${supplyMarketPairs[key].pairs[1].symbol} - ${supplyMarketPairs[key].apy} ${t`apy`}`})
    ))}

    const handleChange = () => {

    }

    return (
        <Styles.SelectWrapper>
            <Field name="marketPair" component={SearchableSelect} options={options} onChange={handleChange} />
        </Styles.SelectWrapper>
    )
}
