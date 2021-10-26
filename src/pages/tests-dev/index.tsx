import { useEffect, useState } from 'react'
import { useBlockNumber } from '@usedapp/core'

export default function TestsDev() {
  const blockNumber = useBlockNumber()

  console.log(blockNumber) // ?

  return (
    <>
      {blockNumber && (
        <h1>Block Number: {blockNumber}</h1>
      )}
    </>
  )
}
