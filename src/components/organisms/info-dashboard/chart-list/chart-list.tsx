import React, { useState } from 'react'
import { t } from '@lingui/macro'
import InfoChart from '@components/organisms/info-dashboard/info-chart'
import Modal from '@components/molecules/modal'
import { InfoChartProps } from "@components/organisms/info-dashboard/info-chart/info-chart";

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
                        dataType="staking"
                        headline={t`Staking TVL`}
                        chartType="bar"
                        handleShowModal={handleShowModal}
                        handleHideModal={() => setModalChartProps(null)}
                    />
                </div>
                <div className="col-md-4">

                </div>
            </div>
            <div className="row">
                <div className="col-12">

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
