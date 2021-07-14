import { useField, FieldConfig, GenericFieldHTMLAttributes } from 'formik'
import { useCallback } from 'react'

export default function useChange<Value>(
    props: GenericFieldHTMLAttributes & FieldConfig<Value>
): ReturnType<(e: React.ChangeEvent) => (e: never) => void> {
    const [{ onChange }] = useField(props)

    return useCallback(
        (e) => {
            if(props.onChange) {
                props.onChange(e)
            } else {
                onChange(e)
            }
        },
        [onChange, props.onChange]
    )
}
