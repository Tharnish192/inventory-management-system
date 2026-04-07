import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      quantity: 10,
      supplier: "Dell",
      price: 50000,
    },
  ],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addProduct, deleteProduct } = inventorySlice.actions;
export default inventorySlice.reducer;