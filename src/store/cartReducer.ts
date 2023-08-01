import { Product } from "../components/Product"; // Add this import to avoid duplicate identifier error

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const ADD_TO_CART = "ADD_TO_CART";

type AddToCartAction = {
  type: typeof ADD_TO_CART;
  payload: Product;
};

type CartActionTypes = AddToCartAction;

const cartReducer = (
  state = initialState,
  action: CartActionTypes
): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};

export const addToCart = (product: Product): AddToCartAction => ({
  type: ADD_TO_CART,
  payload: product,
});

export default cartReducer;
