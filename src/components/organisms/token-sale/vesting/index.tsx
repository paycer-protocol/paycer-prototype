import React from 'react'
import {t, Trans} from '@lingui/macro'
import GradientButton from '@components/atoms/button/gradient-button'
import useVesting from '@hooks/use-vesting'
import { BigNumber } from "@ethersproject/bignumber";
import {FormattedNumber} from "../../../atoms/number/formatted-number";
import CurrencyIcon from "@components/atoms/currency-icon";
import {rewardSymbol} from "@config/staking-rewards";

const Vesting = () => {

    const {
        vested,
        withdrawTx,
        withdraw,
        showFormApproveModal,
        setShowFormApproveModal
    } = useVesting()

    const handleSubmit = async () => {
        await withdraw()
    }

    return (
      <>
        <h2 className="mb-4">
        <Trans>Claimable PCR Tokens</Trans>
        </h2>

        <div className="d-flex flex-column mb-4">
              <span className="display-4">
              +&nbsp;
                  <FormattedNumber
                      value={vested}
                      minimumFractionDigits={2}
                      maximumFractionDigits={4}
                  />
            <CurrencyIcon
                symbol={rewardSymbol}
                className="ms-2"
                width={28}
                height={28}
                style={{marginTop: '-4px'}}
            />
          </span>
        </div>

        <GradientButton onClick={handleSubmit}>
            {t`Claim`}
        </GradientButton>

      </>
    )
}

export default Vesting
