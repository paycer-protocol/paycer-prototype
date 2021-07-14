import React from 'react'
import { Trans, t } from '@lingui/macro'
import { toast } from 'react-toastify';
import useWallet from './hooks/useWallet'
import useNetwork from './hooks/useNetwork'
import Alert from '@components/atoms/alert'
import { INetworkProvider } from './providers'

export interface NetworkProviderProps {
    providers: {
        [chainId: number]: INetworkProvider
    }
}

const NetworkProvider = (props: NetworkProviderProps) => {
    const { providers = {} } = props
    const network = useNetwork()
    const wallet = useWallet()

    const handleSwitchNetwork = async provider => {
        try {
          await network.switchNetwork(provider)
        } catch (error) {
            if (error.code === -32002) {
                toast(<Trans>Network-Switch Pending, please open your Wallet</Trans>)
            }
            if (error.code === 4902) {
                toast(<Trans>Adding Network to Wallet ...</Trans>)
                try {
                    await network.addNetwork(provider)
                } catch (error) {
                    if (error.code === -32002) {
                        toast(<Trans>Previously added network Pending, please open your Wallet</Trans>)
                    }
                }
            }
        }
    }

    return (
        <div className="mt-4">
            <Alert variant="danger" show={!!wallet.errorMessage}>
                {wallet.errorMessage}
            </Alert>
            <div className="row">
                {Object.keys(providers).map((chainId) => {
                    const provider = providers[chainId]
                    const isActive = wallet.isConnected && Number(chainId) === wallet.chainId
                    const className = isActive ? 'bg-dark-soft border-dark mb-2 w-100 p-2 rounded-2 p-3' : 'bg-secondary-dark-soft mb-2 w-100 p-2 rounded-2 p-3'

                    return (
                        <div key={chainId} className="col-3" style={{marginBottom: '18px'}}>
                            <div
                                key={chainId}
                                className={className}
                                onClick={() => handleSwitchNetwork(provider)}
                            >
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="text-start d-flex align-items-center cursor-pointer">
                                        {/* TODO ADD NETWORK ICONS */}
                                        <img width="25" style={{marginRight: '10px'}} src={`assets/network/svg/color/matic.svg`} alt={provider?.chainName} />
                                        <strong>{provider?.chainName}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NetworkProvider
