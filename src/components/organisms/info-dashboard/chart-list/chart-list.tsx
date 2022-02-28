import React, {useState} from 'react'
import { t } from '@lingui/macro'
import InfoChart from '@components/organisms/info-dashboard/info-chart'
import api from '../../../../api'
import Modal from '@components/molecules/modal'
import {InfoChartProps} from "@components/organisms/info-dashboard/info-chart/info-chart";

const ChartList = () => {

    const [modalChartProps, setModalChartProps] = useState<InfoChartProps>(null)

    const handleShowModal = (modalProps: InfoChartProps) => {
        setModalChartProps({...modalProps, isSmall: false, isModal: true})
    }

    return (
        <>
            <div className="row">
                <div className="col-md-8">
                    <InfoChart
                        fetchSeries={api.fetchStakingSeries}
                        headline={t`Staking TVL`}
                        type="bar"
                        handleShowModal={handleShowModal}
                        handleHideModal={() => setModalChartProps(null)}
                    />
                </div>
                <div className="col-md-4">
                    <InfoChart
                        fetchSeries={api.fetchVestingSeries}
                        headline={t`Vesting`}
                        type="bar"
                        isSmall
                        handleShowModal={handleShowModal}
                        handleHideModal={() => setModalChartProps(null)}
                    />
                    <InfoChart
                        fetchSeries={api.fetchVestingSeries}
                        headline={t`Vesting`}
                        type="area"
                        isSmall
                        handleShowModal={handleShowModal}
                        handleHideModal={() => setModalChartProps(null)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <InfoChart
                        fetchSeries={api.fetchStakingSeries}
                        headline={t`Staking TVL`}
                        type="area"
                        handleShowModal={handleShowModal}
                        handleHideModal={() => setModalChartProps(null)}
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
        </>
    )
}

export default ChartList
