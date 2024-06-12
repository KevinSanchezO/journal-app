import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {}) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({});

    useEffect(() => {
        createValidators();
    },[formState])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    /**
     * checks for the status of validation of the form. If all the values in formValidation
     * are null that means that all the validations for the formState have passed successfuly
     * otherwise it will return false.
     */
    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys(formValidation)) {
            if ( formValidation[formValue] != null ) {
                return false;
            }
        }
        return true;
    }, [formValidation])

    /**
     * validates each and every field of the forms with the functions in formValidations
     * creates instances that determine the state of success of every validation and store them in
     * formCheckvalues to set them into the state
     */
    const createValidators = () => {
        const formCheckValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [ fn, errorMessage ] = formValidations[formField];

            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckValues)
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}