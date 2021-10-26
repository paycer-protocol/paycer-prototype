import { createPortal } from 'react-dom'
import { useRef } from 'react'
import { useBlockNumber } from '@usedapp/core'
// import Portal from 'react-overlays/Portal'

interface PortalProps {
  children: any
}

const Portal = (Component) => (props) => {
  console.log('> Portal')

  return createPortal(
    <Component {...props} />,
    document.getElementById('portal-root')
  )
}

const PortalBlockNumber = (props) => {
  const blockNumber = useBlockNumber()

  console.log('> PortalBlockNumber')

  return (
    <div {...props}>
      {blockNumber && (
        <h1>Block Number: {blockNumber}</h1>
      )}
    </div>
  )
}



export default function TestsDev() {
  // const containerRef = useRef(null)

  // const portalRoot = document.getElementById('portal-root')
  // const portalBlock = Portal(PortalBlockNumber)
  Portal(PortalBlockNumber)

  console.log('TestsDev')
  // console.log(blockNumber)
  // console.log(portalBlock)
  // return ReactDOM.createPortal(PortalContent, portalRoot)

  return (
    <>
      <div />
      {/*
      <Portal container={containerRef}>
        {blockNumber && (
          <h1>Block Number: {blockNumber}</h1>
        )}
      </Portal>
       */}
    </>
  )
}
