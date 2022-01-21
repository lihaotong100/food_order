import React, { useImperativeHandle,useState } from 'react';
import useInput from '../hooks/use-input';
import classes from './Form.module.css'

const isNotEmpty = val => val !== "";

const Form = React.forwardRef((props,ref) => {


    const {
            enteredValue:nameInputValue,
            isValueValidate:isNameValidate,
            inputChangeHandler:nameInputHandler,
            inputBlurHandeler:nameBlurHandler
          }
          = useInput(isNotEmpty);

    const {
            enteredValue:streetInputValue,
            isValueValidate:isStreetValidate,
            inputChangeHandler:streetInputHandler,
            inputBlurHandeler:streetBlurHandler
          }
          = useInput(isNotEmpty);

    const [formValidity,setFormValidity] = useState({
        name:true,
        street:true
    });

    const formHasError = isNameValidate && isStreetValidate;

    const postOrderData = async () => {
        
        const orderData = props.cart.items.map(item => {return {
            mealName: item.name,
            mealAmount: item.amount,
            mealPrice: item.price
        }});
        const respone = await fetch("https://react-guide-105d0-default-rtdb.asia-southeast1.firebasedatabase.app/order.json",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                orderData,
                name: nameInputValue,
                street: streetInputValue
            })
        });

        console.log(respone);

        
    }
    const submitData = ()=>{
        if(!isNotEmpty(nameInputValue)){
            setFormValidity({name:false});
            return;
        }
            
        if(formHasError)
            return;
        console.log("submitData");
        postOrderData();
    };

    useImperativeHandle(ref,()=>({
         submitForm (event) {
            console.log(event);
            submitData();
        }
    }));


   return <form onSubmit={submitData}>
       <div className={`${classes.control} ${isNameValidate ? '' : classes.invalid}`}>
           <label
           htmlFor="name" >Name</label>
           <input id="name" 
           value={nameInputValue}
           onChange={nameInputHandler}
           onBlur={nameBlurHandler}
           />
           {!formValidity.name && <p>Name is invalid.Please check</p>}
       </div>
       <div className={`${classes.control}  ${isStreetValidate ? '' : classes.invalid}`}>
       <label htmlFor="street" >street</label>
           <input id="street" 
           value={streetInputValue}
           onChange={streetInputHandler}
           onBlur={streetBlurHandler}
           />
            {!formValidity.street && <p>Street is invalid.Please check</p>}           
       </div>
       {!formHasError && <p>Invalidate input</p>}
   </form>


});

export default Form;