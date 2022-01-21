import { useContext, useRef } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartItem from './CartItem';
import Form from './Form';


const Cart = props => {
    const submitformRef = useRef();

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem(item);
    };

    const sendOrder = () => {
        submitformRef.current.submitForm();
    };


    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(item =>
         <CartItem key={item.id} 
        name={item.name} 
        amount={item.amount} 
        price={item.price} 
        onRemove={cartItemRemoveHandler.bind(null,item.id)}
        onAdd={cartItemAddHandler.bind(null,{...item,amount:1})}
        /> )}
        </ul>;

    return <Modal hideCartHandler={props.onCloseCart}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div>
            <Form ref={submitformRef} cart={cartCtx}></Form>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
            {hasItems && <button className={classes.button} onClick={sendOrder}>Order</button>}
        </div>
    </Modal>

};

export default Cart;