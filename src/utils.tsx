export declare type ValidationSchema = Record<
    string,
    {
        value?: any
        error?: string
        required?: boolean
        validate?:
            | 'text'
            | 'number'
            | 'email'
            | 'phone'
            | 'zip'
            | 'checkbox'
            | 'select'
        minLength?: number
        maxLength?: number
        helperText?: string
    }
>