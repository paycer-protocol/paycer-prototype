// @ts-ignore
import { ERC20, useContractFunction } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import CompoundStrategyUSDC from "../deployments/kovan/CompoundStrategyUSDC.json"
import PUSDC from "../deployments/kovan/PUSDC.json"

// test contract from richard
import USDCPool from "../deployments/kovan/USDCPool.json"

export default function Test () {
  const USDCAddress = '0x2F375e94FC336Cdec2Dc0cCB5277FE59CBf1cAe5'
  const tokenContract = new Contract(USDCAddress, ERC20.abi)
  const { send: approve, state: approveTx } = useContractFunction(tokenContract, 'approve')

  const strategyContract = new Contract(CompoundStrategyUSDC.address, CompoundStrategyUSDC.abi)
  const { send: deposit, state: depositTx } = useContractFunction(strategyContract, 'deposit')

  const handleApprove = async () => {
    approve(CompoundStrategyUSDC.address, 1000000)
  }

  const handleDeposit = async () => {
    deposit(10000)
  }

  return (
    <div>
      Invest testing

      <div className="row">
        <div className="col-12">
          <h2>Approve status: {approveTx.status}</h2>
          <button onClick={handleApprove}>
            Approve
          </button>
        </div>
        <div className="col-12">
          <h2>Deposit status: {depositTx.status}</h2>
          <button onClick={handleDeposit}>
            Deposit
          </button>
        </div>
      </div>
    </div>
  )

}
