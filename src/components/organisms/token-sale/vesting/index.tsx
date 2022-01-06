import React from 'react'
import {t, Trans} from '@lingui/macro'
import GradientButton from '@components/atoms/button/gradient-button'
import useVesting from '@hooks/use-vesting'
import { BigNumber } from "@ethersproject/bignumber";

const Vesting = () => {

    const {
        vested,
        withdrawTx,
        withdraw,
        showFormApproveModal,
        setShowFormApproveModal
    } = useVesting()

    const handleSubmit = (values) => {

    }

    return (
      <>
        <h2 className="mb-4">
            <Trans>Check your investment status</Trans>
        </h2>

          {vested}

      </>
    )
}

export default Vesting
