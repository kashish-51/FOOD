
import React, { createContext, useContext, useReducer } from 'react';
const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
switch (action.type){
  case"ADD":
  return [...state,{id:action.id,Name:action.Name ,qty:action.qty, size: action.size, prize:action.prize, img: action.img }]
  default: console.log("Error in Reducer");
}
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};
export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
