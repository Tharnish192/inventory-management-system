import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addStock } from "../redux/inventorySlice";

const StockEntry = () => {
  const { products } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const selectedProduct = products.find(p => p.id === Number(selectedProductId));

  const handleRestock = (e) => {
    e.preventDefault();
    if(!selectedProductId || !quantityToAdd || quantityToAdd <= 0) return;

    dispatch(addStock({ id: Number(selectedProductId), quantity: Number(quantityToAdd) }));
    setSuccessMessage(`Successfully added ${quantityToAdd} to ${selectedProduct.name}`);
    
    // Reset form
    setSelectedProductId("");
    setQuantityToAdd("");
    
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div>
      <div className="mb-4">
        <h1>Stock Entry</h1>
        <p>Update inventory when new stock shipments are received.</p>
      </div>

      <div className="dashboard-grid">
        <div className="card" style={{gridColumn: "span 1"}}>
          <h2>Receive Stock</h2>
          {successMessage && <div className="badge badge-success mb-4" style={{display: 'block', padding: '0.75rem', textAlign: 'center'}}>{successMessage}</div>}
          
          <form onSubmit={handleRestock} className="mt-4">
            <div className="form-group">
              <label className="form-label">Select Product</label>
              <select 
                className="form-control"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                required
              >
                <option value="" disabled>Select a product to restock...</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Current: {p.quantity})
                  </option>
                ))}
              </select>
            </div>

            {selectedProduct && (
              <div className="form-group" style={{background: 'rgba(0,0,0,0.02)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                  <span className="form-label mb-0">Current Quantity:</span>
                  <strong>{selectedProduct.quantity}</strong>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span className="form-label mb-0">Low Stock Threshold:</span>
                  <strong>{selectedProduct.threshold}</strong>
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Units Received</label>
              <input 
                type="number" 
                className="form-control"
                min="1"
                value={quantityToAdd}
                onChange={(e) => setQuantityToAdd(e.target.value)}
                placeholder="amount"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}}>
              Update Stock Level
            </button>
          </form>
        </div>

        <div className="card" style={{gridColumn: "span 1"}}>
          <h2>Low Stock Items</h2>
          <p className="text-muted" style={{marginBottom: '1rem', fontSize: '0.875rem'}}>Items below their set threshold</p>
          
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.filter(p => p.quantity <= p.threshold).map(product => (
                 <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                      <span className={`badge badge-${product.quantity === 0 ? 'danger' : 'warning'}`}>
                        {product.quantity}
                      </span>
                    </td>
                  </tr>
                ))}
                {products.filter(p => p.quantity <= p.threshold).length === 0 && (
                  <tr><td colSpan="2" className="text-center">No low stock items</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockEntry;