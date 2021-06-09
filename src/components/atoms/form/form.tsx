import { Formik, FormikValues } from 'formik'
import React, { FC } from 'react'
import { Form as BootstrapForm } from 'react-bootstrap'
import { DerivedFormikProps, FormProps } from './types'
import Group from './group'
import Input from './input'
import './form.styles.scss'

type FormComponent = FC<FormProps<FormikValues>> & {
    Group: typeof Group
    Input: typeof Input
}

const Form: FormComponent = ({ className, children, ...restProps }: FormProps<FormikValues>) => (
    <Formik {...restProps}>
        {({ handleSubmit }: DerivedFormikProps<FormikValues>) => (
            <BootstrapForm className={className} onSubmit={handleSubmit}>
                {children}
            </BootstrapForm>
        )}
    </Formik>
)

Form.Group = Group
Form.Input = Input

export * from './types'
export default Form
