import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../redux/inventorySlice";

function Inventory() {
  const products = useSelector((state) => state.inventory.products);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    supplier: "",
    price: "",
  });

  const handleAdd = () => {
    dispatch(
      addProduct({
        id: Date.now(),
        ...form,
      })
    );

    setForm({
      name: "",
      category: "",
      quantity: "",
      supplier: "",
      price: "",
    });
  };

  return (
    <div>
      <h1>Inventory</h1>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
      />
      <input
        placeholder="Supplier"
        value={form.supplier}
        onChange={(e) => setForm({ ...form, supplier: e.target.value })}
      />
      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button onClick={handleAdd}>Add Product</button>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Supplier</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.supplier}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => dispatch(deleteProduct(item.id))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;