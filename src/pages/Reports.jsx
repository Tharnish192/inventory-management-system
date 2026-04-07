import { useSelector } from "react-redux";

function Reports() {
  const products = useSelector((state) => state.inventory.products);
  const lowStock = products.filter((item) => Number(item.quantity) < 5);

  const totalStock = products.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  return (
    <div className="dashboard">
      <h1>Inventory Reports</h1>

      <div className="card">
        <h2>Total Products</h2>
        <p>{products.length}</p>
      </div>

      <div className="card">
        <h2>Total Stock Units</h2>
        <p>{totalStock}</p>
      </div>

      <div className="card">
        <h2>Low Stock Items</h2>
        <p>{lowStock.length}</p>
      </div>

      <h2>Sales Performance</h2>
      <p>Demo: Sales increased by 15% this month 📈</p>
    </div>
  );
}

export default Reports;