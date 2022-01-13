import { useReducer } from "react";
import CartContext from "./cart-context";


const defaultCartState = {
    items:[],
    totalAmount: 0
}

const cartReducer = (state,action) => {
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        
        let updatedItem;
        let updatedItems;
        if(existingCartItem){
            console.log(existingCartItem);
            console.log(action.item.amount);

            updatedItem = {
                ...existingCartItem,
                amount:existingCartItem.amount + action.item.amount
            };

            console.log(updatedItem);

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;

        }else{
            updatedItems = state.items.concat(action.item);
        }
        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        };
    }
    if(action.type == "REMOVE"){
        console.log(state);

        const itemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[itemIndex];
        let totalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems = [...state.items];
        if(updatedItems[itemIndex].amount === 1){
           updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else{
            let updatedItem = {...existingCartItem,amount:existingCartItem.amount - 1};
            updatedItems[itemIndex] = updatedItem;
        }
        console.log(updatedItems);

        return{
            items:updatedItems,
            totalAmount: totalAmount
        };
    }
    return defaultCartState;
}

const CartProvider = props => {

    const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type:"ADD",item:item });
    };

    const removeItemToCartHandler = id => {
        dispatchCartAction({type:"REMOVE",id:id });
    };


    const cartContext = {
        items:cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler       
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;