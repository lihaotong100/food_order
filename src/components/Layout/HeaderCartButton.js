import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context';
import { useContext, useEffect, useState } from 'react';

const HeaderCartButton = props => {
    //by using context here, this component will be reevaluated by react whenever the 
    //context changes
    const cartCtx = useContext(CartContext);

    const [btnAnimated,setBtnAnimated] = useState(false);

    const numberOfCartItems = cartCtx.items.reduce((i,item)=>{
        return i + item.amount
    },0);

    const {items} = cartCtx;

    const btnClasses = `${classes.button} ${btnAnimated ? classes.bump : ''}`;

    useEffect(() => {
        if(cartCtx.items.length === 0){
            return;
        }
        setBtnAnimated(true);

        const timer = setTimeout(()=>{
            setBtnAnimated(false);
        },300);

        //this function will run before the next useeffect is called
        return () => {
            clearTimeout(timer);
        };
    },[items]);

    return <button className={btnClasses} onClick={props.onClick}>
    <span className={classes.icon}>
        <CartIcon />
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
};

export default HeaderCartButton;