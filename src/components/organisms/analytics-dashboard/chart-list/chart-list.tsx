import React, { useState } from 'react'
import { t } from '@lingui/macro'
import InfoChart from '@components/organisms/analytics-dashboard/info-chart'
import Modal from '@components/molecules/modal'
import { InfoChartProps } from '../types'
import { useMediaQuery } from 'react-responsive'

const ChartList = () => {

    const [modalChartProps, setModalChartProps] = useState<InfoChartProps>(null)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })

    const handleShowModal = (modalProps: InfoChartProps) => {
        setModalChartProps({...modalProps, isSmall: false, isModal: true})
    }

    return (
        <div style={{background: 'rgba(14, 22, 40, 0.3)'}}>
            <div className="row">
                <div className="col-md-8">
                    <InfoChart
                        dataType="staking"
                        headline={t`Staking TVL`}
                        chartType="area"
                        handleShowModal={handleShowModal}
                        handleHideModal={() => setModalChartProps(null)}
                        isSmall={isTabletOrMobile}
                    />
                </div>
                <div className="col-md-4">
                    <InfoChart
                        dataType="dailyStaked"
                        headline={t`Daily Staking`}
                        chartType="area"
                        handleShowModal={handleShowModal}
                        handleHideModal={() => setModalChartProps(null)}
                        isSmall
                    />
                    <InfoChart
                        dataType="dailyWithdrawn"
                        headline={t`Daily Staking Withdrawn`}
                        chartType="bar"
                        handleShowModal={handleShowModal}
                        handleHideModal={() => setModalChartProps(null)}
                        isSmall
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <InfoChart
                        dataType="vesting"
                        headline={t`Released Vesting Tokens`}
                        chartType="bar"
                        handleShowModal={handleShowModal}
                        handleHideModal={() => setModalChartProps(null)}
                        isSmall={isTabletOrMobile}
                    />
                </div>
                <div className="col-md-4">
                    <InfoChart
                        dataType="dailyVestingWithdrawn"
                        headline={t`Daily Vesting Withdrawn`}
                        chartType="area"
                        handleShowModal={handleShowModal}
                        handleHideModal={() => setModalChartProps(null)}
                        isSmall
                    />
                    <InfoChart
                        dataType="dailyHolders"
                        headline={t`Daily Transactions`}
                        chartType="bar"
                        handleShowModal={handleShowModal}
                        handleHideModal={() => setModalChartProps(null)}
                        isSmall
                    />
                </div>
            </div>
            {modalChartProps &&
                <Modal show size="xl" centered>
                  <Modal.Body className="p-0">
                    <InfoChart
                        {...modalChartProps}
                    />
                  </Modal.Body>
                </Modal>
            }
        </div>
    )
}

export default ChartList
