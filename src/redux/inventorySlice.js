import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    { id: 1, name: "Laptop", category: "Electronics", quantity: 15, threshold: 20, price: 999.99 },
    { id: 2, name: "Office Chair", category: "Furniture", quantity: 45, threshold: 10, price: 149.50 },
    { id: 3, name: "Printer Ink", category: "Stationery", quantity: 5, threshold: 15, price: 25.00 },
  ],
  orders: [], // { id, productId, quantity, date, status }
  alerts: [], // { id, message, type: 'warning' | 'danger', read: false }
  sales: [],  // { id, productId, quantity, total, date }
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    // Inventory CRUD
    addProduct: (state, action) => {
      state.products.push(action.payload);
      checkAlerts(state);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        checkAlerts(state);
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(item => item.id !== action.payload);
      checkAlerts(state);
    },
    
    // Staff operations
    addStock: (state, action) => {
      // payload: { id: productId, quantity: amountAdded }
      const product = state.products.find(p => p.id === action.payload.id);
      if (product) {
        product.quantity += action.payload.quantity;
        checkAlerts(state);
      }
    },
    processSale: (state, action) => {
      // payload: { productId, quantity }
      const product = state.products.find(p => p.id === action.payload.productId);
      if (product && product.quantity >= action.payload.quantity) {
        product.quantity -= action.payload.quantity;
        state.sales.push({
          id: Date.now(),
          productId: product.id,
          productName: product.name,
          quantity: action.payload.quantity,
          total: product.price * action.payload.quantity,
          date: new Date().toISOString()
        });
        checkAlerts(state);
      }
    },

    // Alerts
    markAlertRead: (state, action) => {
      const alert = state.alerts.find(a => a.id === action.payload);
      if(alert) alert.read = true;
    }
  },
});

// Helper function to generate alerts based on stock thresholds
function checkAlerts(state) {
  state.products.forEach(product => {
    const existingAlertIdx = state.alerts.findIndex(a => a.productId === product.id);
    
    if (product.quantity <= product.threshold) {
      if (existingAlertIdx === -1) {
        state.alerts.push({
          id: Date.now() + Math.random(),
          productId: product.id,
          message: `Low stock for ${product.name} (${product.quantity} left)`,
          type: product.quantity === 0 ? "danger" : "warning",
          read: false
        });
      } else {
        // Update existing alert
        state.alerts[existingAlertIdx].message = `Low stock for ${product.name} (${product.quantity} left)`;
        state.alerts[existingAlertIdx].type = product.quantity === 0 ? "danger" : "warning";
        state.alerts[existingAlertIdx].read = false;
      }
    } else if (existingAlertIdx !== -1) {
      // Remove alert if stock is back to normal
      state.alerts.splice(existingAlertIdx, 1);
    }
  });
}

export const { 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  addStock, 
  processSale, 
  markAlertRead 
} = inventorySlice.actions;

export default inventorySlice.reducer;