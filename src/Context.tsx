import React, { createContext, useReducer } from 'react'
import { initialValues } from "./initialValues";
import { ValidationSchema } from "./utils";
import { Reducer, Action, State } from './Reducer';

const isText = RegExp(/^[A-Z ]+$/i)
const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
const isPhone = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/) // us
const isZip = RegExp(/^[0-9]{5}([- /]?[0-9]{4})?$/) // us
const isNumber = RegExp(/^\d+$/)

const variant = 'standard'
const margin = 'normal'

type ContextProps = {
    activeStep: number
    formValues: ValidationSchema
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        checked?: boolean,
    ) => void
    handleNext: () => void
    handleBack: () => void
    variant: 'outlined' | 'standard' | 'filled'
    margin: 'dense' | 'normal' | 'none'
}

export const AppContext = createContext<ContextProps>({
    activeStep: 0,
    formValues: initialValues,
    handleChange() {},
    handleNext() {},
    handleBack() {},
    variant,
    margin
})

interface ProviderProps {
    children: React.ReactNode
}

export function StepsProvider({ children }: ProviderProps) {
    const [{ activeStep, formValues }, dispatch] = useReducer(Reducer, {
        activeStep: 0,
        formValues: initialValues
    })
    const handleNext = () => dispatch({ type: 'increase' })
    // Go back to prev step
    const handleBack = () => dispatch({ type: 'decrease' })

    // Handle form change
    const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    checked?: boolean
    ) => {
    const { type, name, value } = event.target

    const fieldValue = type === 'checkbox' ? checked : value

    dispatch({ type: 'form-value', name, fieldValue })

    const fieldName = initialValues[name]
    if (!fieldName) return

    const { required, validate, minLength, maxLength, helperText } = fieldName

    let error = ''

    if (required && !fieldValue) error = 'This field is required'
    if (minLength && value && value.length < minLength)
        error = `Minimum ${minLength} characters is required.`
    if (maxLength && value && value.length > maxLength)
        error = 'Maximum length exceeded!'
    if (validate) {
        switch (validate) {
        case 'text':
            if (value && !isText.test(value))
            error = helperText || 'This field accepts text only.'
            break

        case 'number':
            if (value && !isNumber.test(value))
            error = helperText || 'This field accepts numbers only.'
            break

        case 'email':
            if (value && !isEmail.test(value))
            error = helperText || 'Please enter a valid email address.'
            break

        case 'phone':
            if (value && !isPhone.test(value))
            error =
                helperText ||
                'Please enter a valid phone number. i.e: xxx-xxx-xxxx'
            break

        case 'zip':
            if (value && !isZip.test(value))
            error = helperText || 'Please enter a valid zip code.'
            break

        case 'checkbox':
            if (!checked) error = helperText || 'Please provide a valid value.'
            break

        case 'select':
            if (!value) error = helperText || 'Please select a value.'
            break

        default:
            break
        }
    }

    dispatch({ type: 'form-error', name, error })
    }

    return (
    <AppContext.Provider
        value={{
        activeStep,
        formValues,
        handleChange,
        handleNext,
        handleBack,
        variant,
        margin
        }}
    >
        <div className="mui-step-form">{children}</div>
    </AppContext.Provider>
    )
}