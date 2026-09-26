import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from "react";

import all_products from "../Components/Assets/all_products";
import { DataContext } from "./DataContext";

export const ShopContext = createContext(null);

const getDefaultCart = () => ({});

const ShopContextProvider = (props) => {

  const { data } = useContext(DataContext);
  const products = [...all_products, ...data];

  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCart = (itemId) => {

    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/cartitem', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId })
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId })
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  const getTotal = () => {

    let total = 0;

    for (const item in cartItems) {

      if (cartItems[item] > 0) {

        let product = products.find(
          (p) => p.id === Number(item)
        );

        if (product) {
          total += product.new_price * cartItems[item];
        }
      }
      total+=21;
    }

    return total;
  };

  const totalcart = () => {

    let totalitem = 0;

    for (const item in cartItems) {

      if (cartItems[item] > 0) {
        totalitem += cartItems[item];
      }
    }

    return totalitem;
  };

  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotal,
    totalcart
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;