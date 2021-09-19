import { FieldProps } from 'formik'
import React from 'react'
import Select, { Option, ReactSelectProps } from 'react-select'

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px solid #213752',
        color: '#FFF',
        padding: 20,
        backgroundColor: state.isSelected ? '#0B1120' : 'none',
        ':active': {
            backgroundColor: '#0B1120'
        },
        ':hover': {
            backgroundColor: '#0B1120'
        },
        cursor: 'pointer'

    }),
    control: () => ({
        display: 'flex',
        width: 200,
        height: '100%'
    }),
    indicatorSeparator: () => ({
       display: 'none'
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0 : 1;
        const transition = 'opacity 300ms';
        const color =  '#FFF'
        return { ...provided, opacity, transition, color };
    },
    input: () => ({
        marginRight: '4px'
    }),
    menu: (provided) => ({
        ...provided,
        border: '1px solid #213752',
        background: '#192434',
        borderRadius: '8px',
        color: '#FFF'
    })
}

const SelectField: React.SFC<ReactSelectProps & FieldProps> = ({
                                                                   options,
                                                                   field,
                                                                   form,
                                                               }) => (
    <Select
        options={options}
        name={field.name}
        value={options ? options.find(option => option.value === field.value) : ''}
        onChange={(option: Option) => form.setFieldValue(field.name, option.value)}
        onBlur={field.onBlur}
        styles={customStyles}
    />
)

export default SelectField