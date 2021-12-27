import React from 'react'
import useStaking from '@hooks/use-staking'
import useWallet from '@hooks/use-wallet'
import {ChainId, useContractCall, useEthers} from "@usedapp/core";
import {Interface} from "@ethersproject/abi";
import stakingAbi from "@contracts/abi/StakingRewards.json";
import {contractProvider} from "@providers/contracts";

export default function StakingTest () {
  const wallet = useWallet()
  const { claim, claimTx, deposit, depositTx, withdraw, withdrawTx }  = useStaking()

  const { account, chainId } = useEthers()
  const contractAddress = contractProvider.StakingRewards.chainAddresses[chainId || ChainId.Mainnet]

  const result = useContractCall(
      {
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'userInfo',
        args: [wallet.address],
      }
  )

  console.log(result);

  return (
    <div className="container">
      <h1>Staking test</h1>
      <div className="row">
        <div className="col-12">
          <h2>Claim status: {claimTx.status}</h2>
          <button onClick={async () => {
            console.log(await claim())
          }}>
            Claim
          </button>
        </div>
        <div className="col-12">
          <h2>Withdraw status: {withdrawTx.status}</h2>
          <button onClick={async () => {
            console.log(await withdraw(0))
          }}>
            Withdraw
          </button>
        </div>
        <div className="col-12">
          <h2>Deposit status: {depositTx.status}</h2>
          <button onClick={async () => {
            console.log(await deposit(0))
          }}>
            Deposit
          </button>
        </div>
      </div>
    </div>
  )

}
