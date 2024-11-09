import { act, createContext, useReducer, useState } from "react";
import { DUMMY_PRODUCTS } from "../src/dummy-products";

export const CartContext = createContext({
    items: [],
    onAddToCart: () => {},
    onUpdateCartItemQuantity: () => {}
})
const initialValue = {
    items: []
}
const reducer = (state, action) => {
    if(action.type === 'Add_Item'){
        const updatedItems = [...state.items];
    
          const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
          );
          const existingCartItem = updatedItems[existingCartItemIndex];
    
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
              id: action.payload,
              name: product.title,
              price: product.price,
              quantity: 1,
            });
          }
    
          return {
            ...state,
            items: updatedItems,
          };
    }
    if(action.type === 'Update_Item'){
        const updatedItems = [...state.items];
          const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
          );
    
          const updatedItem = {
            ...updatedItems[updatedItemIndex],
          };
    
          updatedItem.quantity += action.payload.amount;
    
          if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
          } else {
            updatedItems[updatedItemIndex] = updatedItem;
          }
    
          return {
            ...state,
            items: updatedItems,
          };
    }
    return state
}
export default function ContexProvider({children}){
    const [shoppingCart, dispatch] = useReducer(reducer, initialValue)   
    
      function handleAddItemToCart(id) {
        dispatch({
            type: 'Add_Item',
            payload: id
        }) 
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        dispatch({
            type: 'Update_Item',
            payload: {
                productId: productId,
                amount: amount
            }
        }) 
      }
      const crtContext = {
        items: shoppingCart.items, 
        onAddToCart: handleAddItemToCart,
        onUpdateCartItemQuantity: handleUpdateCartItemQuantity
      }
    return <CartContext.Provider value={crtContext}>
        {children}
    </CartContext.Provider>
};