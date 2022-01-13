import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef,useState } from 'react';

const MealItemForm = props => {

    const [amountIsValid,setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = event =>{
        event.preventDefault();
        const enteredAmount = +amountInputRef.current.value;

        if(enteredAmount < 1 || enteredAmount > 5){
            setAmountIsValid(false);
        }

        props.onAddToCart(enteredAmount);
    };

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input 
            label="Amount" 
            ref={amountInputRef}
            input={{
            type:"number",
            id: "amount" + props.id,
            min : "1",
            max: "5",
            step: "1",
            defaultValue: "1"
            }}/>
        {!amountIsValid && <p>Please input valid amount</p>}
        <button>Add</button>

    </form>
};

export default MealItemForm