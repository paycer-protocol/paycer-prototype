import React, { useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import InfoChart from '@components/organisms/analytics-dashboard/info-chart'
import Modal from '@components/molecules/modal'
import { InfoChartProps } from '../types'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios'

const TOKEN_PRICE_ENDPOINT = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=paycer-protocol';

function useTokenPrice(): number | undefined {
    const [price, setPrice] = useState<number | undefined>(undefined);
    useEffect(() => {
        axios.get<[{ current_price: number }]>(TOKEN_PRICE_ENDPOINT).then((response) => {
            setPrice(response.data[0].current_price)
        });
    }, []);
    return price;
}

const ChartList = () => {

    const [modalChartProps, setModalChartProps] = useState<InfoChartProps>(null)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })

    const handleShowModal = (modalProps: InfoChartProps) => {
        setModalChartProps({ ...modalProps, isSmall: false, isModal: true })
    }

    const tokenPrice = useTokenPrice();

    return (
        <div style={{ background: 'rgba(14, 22, 40, 0.3)' }}>
            <div className="row">
                <div className="col-md-8">
                    <InfoChart
                        dataType="staking"
                        headline={t`Staking TVL`}
                        tokenPrice={tokenPrice}
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
                        tokenPrice={tokenPrice}
                        chartType="area"
                        handleShowModal={handleShowModal}
                        handleHideModal={() => setModalChartProps(null)}
                        isSmall
                    />
                    <InfoChart
                        dataType="dailyWithdrawn"
                        headline={t`Daily Staking Withdrawn`}
                        tokenPrice={tokenPrice}
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
                        tokenPrice={tokenPrice}
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
                        tokenPrice={tokenPrice}
                        chartType="area"
                        handleShowModal={handleShowModal}
                        handleHideModal={() => setModalChartProps(null)}
                        isSmall
                    />
                    <InfoChart
                        dataType="dailyHolders"
                        headline={t`Daily Transactions`}
                        tokenPrice={tokenPrice}
                        chartType="bar"
                        handleShowModal={handleShowModal}
                        handleHideModal={() => setModalChartProps(null)}
                        isSmall
                    />
                </div>

                <p className="text-muted mt-3"><Trans>USD prices provided by the CoinGecko API.</Trans></p>
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
