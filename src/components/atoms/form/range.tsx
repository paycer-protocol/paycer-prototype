import React from 'react'
import Slider, { SliderProps } from 'rc-slider'

export default function RangeSlider(props: SliderProps) {

    return (
        <div style={{ width: '96.5%', position: 'relative', 'left': '1%' }}>
            {/*@ts-ignore  */}
            <Slider
                {... props}
                trackStyle={{
                    background: 'linear-gradient(to left,rgba(133,12,167,1) 0%,rgba(66,1,220,1) 100%)',
                    height: '5px',
                }}
                railStyle={{
                    background: '#0b1120',
                    height: '5px',
                }}
                handleStyle={{
                    border: '0',
                    width: '15px',
                    height: '15px',
                    top: '5px',
                    background: '#FFF'
                }}
                dotStyle={{
                    border: 0,
                    width: '8px',
                    height: '8px',
                    top: '-1px'
                }}
                activeDotStyle={{
                    outline: '2px solid #9127af',
                    width: '8px',
                    height: '8px',
                    top: '-1px'
                }}
            />
        </div>
    )
}
