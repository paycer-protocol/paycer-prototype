import React from 'react'
import classnames from 'classnames';
import {t} from "@lingui/macro";

interface TransactionStatusProps {
  error?: boolean
  success?: boolean
  loading?: boolean
}

export default function TransactionStatus(props: TransactionStatusProps):any {
    const { error, success, loading } = props

    const classes = classnames(`text-center`, {
        'text-success': success || loading,
        'text-danger': error,
    })

    const renderStatusMessage = () => {
        if (loading) {
            return `${t`Loading...`}`
        }
        if (success) {
            return `${t`Successful`}`
        }
        if (error) {
            return `${t`Failed, please try again or contact the Support`}`
        }
    }

    return (
        <>
            <div className={classes}>
                {renderStatusMessage()}
            </div>
        </>
    )
}
