import { useState } from "react";

const useInput = (validationFn) => {

    const [enteredValue,setEnteredValue] = useState('');
    const [isValueValidate,setIsalueValidate] = useState(true);

    const inputChangeHandler = (event) => setEnteredValue(event.target.value);

    const inputBlurHandeler = () => {
        setIsalueValidate(validationFn(enteredValue));
    };
    
    return {
        enteredValue,
        isValueValidate,
        inputChangeHandler,
        inputBlurHandeler
    };

};

export default useInput;