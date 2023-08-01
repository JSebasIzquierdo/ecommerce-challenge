import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ShoppingCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.length;
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <i className="fas fa-shopping-cart text-2xl mr-2"></i>
      </div>
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white mr-2">
        {totalItems}
      </div>
      <p>${totalPrice}</p>
    </div>
  );
};

export default ShoppingCart;
