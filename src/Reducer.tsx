import { ValidationSchema } from "./utils";

export declare type State = {
    activeStep: number
    formValues: ValidationSchema
}

export declare type Action =
    | { type: 'increase' }
    | { type: 'decrease' }
    | { type: 'form-value'; name: string; fieldValue: any }
    | { type: 'form-error'; name: string; error: string }

export const Reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'increase':
        return {
            ...state,
            activeStep: state.activeStep + 1
        }
        case 'decrease':
        return {
            ...state,
            activeStep: state.activeStep - 1
        }
        case 'form-value':
        return {
            ...state,
            formValues: {
            ...state.formValues,
            [action.name]: {
                ...state.formValues[action.name],
                value: action.fieldValue
            }
            }
        }
        case 'form-error':
        return {
            ...state,
            formValues: {
            ...state.formValues,
            [action.name]: {
                ...state.formValues[action.name],
                error: action.error
            }
            }
        }

        default:
        return state
    }
}
  