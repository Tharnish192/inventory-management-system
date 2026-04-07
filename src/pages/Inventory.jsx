import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, updateProduct, deleteProduct } from "../redux/inventorySlice";

const Inventory = () => {
  const { products } = useSelector((state) => state.inventory);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const hasEditAccess = user?.role === "admin" || user?.role === "staff";

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 0,
    threshold: 0,
    price: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "name" || name === "category" ? value : Number(value)
    });
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      threshold: product.threshold,
      price: product.price
    });
  };

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: "", category: "", quantity: 0, threshold: 0, price: 0 });
  };

  const handleSave = () => {
    if(!formData.name || !formData.category) return;

    if (editingId) {
      dispatch(updateProduct({ id: editingId, ...formData }));
    } else {
      dispatch(addProduct({ id: Date.now(), ...formData }));
    }
    cancelEdit();
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div>
      <div className="flex justify-between align-center mb-4">
        <div>
          <h1>Inventory Management</h1>
          <p>View {hasEditAccess ? "and manage " : ""}your stock levels.</p>
        </div>
        {hasEditAccess && !isAdding && !editingId && (
          <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Product
          </button>
        )}
      </div>

      {(isAdding || editingId) && hasEditAccess ? (
        <div className="card mb-4">
          <h2>{editingId ? "Edit Product" : "New Product"}</h2>
          <div className="dashboard-grid mt-4">
            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input type="text" name="category" className="form-control" value={formData.category} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Price ($)</label>
              <input type="number" name="price" className="form-control" value={formData.price} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Current Quantity</label>
              <input type="number" name="quantity" className="form-control" value={formData.quantity} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Low Stock Threshold</label>
              <input type="number" name="threshold" className="form-control" value={formData.threshold} onChange={handleInputChange} />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button className="btn btn-primary" onClick={handleSave}>Save Product</button>
            <button className="btn btn-outline" onClick={cancelEdit}>Cancel</button>
          </div>
        </div>
      ) : null}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              {hasEditAccess && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{fontFamily: 'var(--mono)', fontSize: '0.8rem'}}>#{product.id}</td>
                <td style={{fontWeight: 500}}>{product.name}</td>
                <td>{product.category}</td>
                <td>${Number(product.price).toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.quantity === 0 ? (
                    <span className="badge badge-danger">Out of Stock</span>
                  ) : product.quantity <= product.threshold ? (
                    <span className="badge badge-warning">Low Stock</span>
                  ) : (
                    <span className="badge badge-success">In Stock</span>
                  )}
                </td>
                {hasEditAccess && (
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-outline" style={{padding: '0.25rem 0.5rem'}} onClick={() => startEdit(product)}>Edit</button>
                      {user?.role === "admin" && (
                        <button className="btn btn-danger" style={{padding: '0.25rem 0.5rem'}} onClick={() => handleDelete(product.id)}>Delete</button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={hasEditAccess ? 7 : 6} className="text-center">No products found in inventory.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;