import Header from './components/Layout/Hearder';
import { Fragment, useCallback, useState } from 'react';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Test from './components/test';

function App() {

  const [cartIsShown,setCartIsShown] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  console.log("App");

  return (
    <CartProvider>

      { cartIsShown && <Cart onCloseCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main> 

    </CartProvider>

);
}

export default App;
