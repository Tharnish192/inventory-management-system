import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { processSale } from "../redux/inventorySlice";

const Orders = () => {
  const { products } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantityToSell, setQuantityToSell] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const selectedProduct = products.find(p => p.id === Number(selectedProductId));

  const handleSale = (e) => {
    e.preventDefault();
    if(!selectedProductId || !quantityToSell || quantityToSell <= 0) return;

    if (Number(quantityToSell) > selectedProduct.quantity) {
      setError(`Cannot process order: Only ${selectedProduct.quantity} units available.`);
      setTimeout(() => setError(""), 4000);
      return;
    }

    dispatch(processSale({ productId: Number(selectedProductId), quantity: Number(quantityToSell) }));
    setSuccessMessage(`Order processed: Sold ${quantityToSell}x ${selectedProduct.name}`);
    
    // Reset form
    setSelectedProductId("");
    setQuantityToSell("");
    setError("");
    
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  return (
    <div>
      <div className="mb-4">
        <h1>Sales & Orders Management</h1>
        <p>Process customer sales orders and automatically deduct from stock.</p>
      </div>

      <div className="dashboard-grid">
        <div className="card" style={{gridColumn: "span 1"}}>
           <h2>Process Sale</h2>
           {successMessage && <div className="badge badge-success mb-4" style={{display: 'block', padding: '0.75rem', textAlign: 'center'}}>{successMessage}</div>}
           {error && <div className="badge badge-danger mb-4" style={{display: 'block', padding: '0.75rem', textAlign: 'center'}}>{error}</div>}
          
           <form onSubmit={handleSale} className="mt-4">
            <div className="form-group">
              <label className="form-label">Select Product</label>
              <select 
                className="form-control"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                required
              >
                <option value="" disabled>Select product to checkout...</option>
                {products.filter(p => p.quantity > 0).map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Stock: {p.quantity}) - ${Number(p.price).toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {selectedProduct && (
              <div className="form-group" style={{background: 'rgba(79, 70, 229, 0.05)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                  <span className="form-label mb-0">Price per unit:</span>
                  <strong>${Number(selectedProduct.price).toFixed(2)}</strong>
                </div>
                {quantityToSell > 0 && (
                  <div style={{display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem'}}>
                    <span className="form-label mb-0">Order Total:</span>
                    <strong style={{color: 'var(--primary)', fontSize: '1.2rem'}}>${(selectedProduct.price * quantityToSell).toFixed(2)}</strong>
                  </div>
                )}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Quantity to Sell</label>
              <input 
                type="number" 
                className="form-control"
                min="1"
                max={selectedProduct ? selectedProduct.quantity : ""}
                value={quantityToSell}
                onChange={(e) => setQuantityToSell(e.target.value)}
                placeholder="quantity"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}}>
              Complete Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Orders;