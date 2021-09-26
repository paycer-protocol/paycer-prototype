import { FieldProps } from 'formik'
import React from 'react'
import Select, { Option, ReactSelectProps } from 'react-select'

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px solid #0B1120',
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
        height: '100%'
    }),
    indicatorSeparator: () => ({
       display: 'none'
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0 : 1;
        const transition = 'opacity 300ms';
        const color =  '#FFF'
        const fontSize = '22px'
        return { ...provided, opacity, transition, color, fontSize };
    },
    input: () => ({
        marginRight: '4px'
    }),
    menu: (provided) => ({
        ...provided,
        border: '1px solid #0B1120',
        background: '#1B2236',
        borderRadius: '8px',
        color: '#FFF',
        width: "400px"
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: '18px',
        fontWeight: 300,
        marginLeft: '0',
    }),
    valueContainer: (provided) => ({
        ...provided,
        paddingLeft: '0'
    })
}

const SelectField: React.SFC<ReactSelectProps & FieldProps> = ({
                                                                   options,
                                                                   field,
                                                                   form,
                                                                   onChange = () => {}
                                                               }) => (
    <>
    <Select
        options={options}
        name={field.name}
        value={(options && field.value) ? options.find(option => option.value === field.value) : ''}
        onChange={(option: Option) => {
            form.setFieldValue(field.name, option.value)
            onChange(option.value)
        }}
        escapeClearsValue
        onBlur={field.onBlur}
        styles={customStyles}
    />
    </>
)

export default SelectField