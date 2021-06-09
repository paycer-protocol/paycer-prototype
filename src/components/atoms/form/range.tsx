import React, { FC } from 'react'
import Input from './input'
import { FormRangeFieldProps } from './types'

const Range: FC<FormRangeFieldProps> = (props: FormRangeFieldProps) => (
    <Input {...props} type="range" />
)

export default Range
