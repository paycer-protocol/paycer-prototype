import React, { MutableRefObject, ReactElement, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export interface SectionHocProps {
  anchorRef: MutableRefObject<HTMLDivElement>
  anchorId: number
  children: ReactElement | string | number | null,
}

const SectionHoc = (props: SectionHocProps) => {
  const { ref, inView } = useInView()
  const { anchorRef, anchorId, children } = props

  useEffect(() => {
    const anchorLink = document.querySelector(`[rel="anchor-${anchorId}"]`)

    if (inView) {
      console.log(anchorId)
      const anchors = document.querySelectorAll('.anchor--isActive')
      anchors.forEach((el, i) => {
        if (el !== anchorLink) {
          el.classList.remove('anchor--isActive')
        }
      })
      if (anchorLink) {
        anchorLink.classList.add('anchor--isActive')
      }
    }
  }, [inView])

  return (
    <div ref={anchorRef}>
      <div ref={ref}>
        {children}
      </div>
    </div>
  )
}

export default SectionHoc
