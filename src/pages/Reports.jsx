import { useSelector } from "react-redux";

const Reports = () => {
  const { products, sales } = useSelector((state) => state.inventory);

  const totalStockValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const totalSalesRevenue = sales.reduce((sum, s) => sum + s.total, 0);

  // Group sales by product for basic reporting
  const salesByProduct = sales.reduce((acc, sale) => {
    if(!acc[sale.productId]) {
      acc[sale.productId] = { name: sale.productName, quantity: 0, revenue: 0 };
    }
    acc[sale.productId].quantity += sale.quantity;
    acc[sale.productId].revenue += sale.total;
    return acc;
  }, {});

  const topSellingProducts = Object.values(salesByProduct)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <div>
      <div className="mb-4">
        <h1>System Reports</h1>
        <p>Comprehensive overview of inventory and sales performance.</p>
      </div>

      <div className="dashboard-grid mb-4">
        <div className="card" style={{background: 'var(--primary)', color: 'white'}}>
          <h3 style={{fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem', opacity: 0.9}}>Overall Sales Revenue</h3>
          <div style={{fontSize: '2.5rem', fontWeight: 700}}>${totalSalesRevenue.toFixed(2)}</div>
        </div>
        <div className="card" style={{background: 'var(--secondary)', color: 'white'}}>
          <h3 style={{fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem', opacity: 0.9}}>Total Inventory Value</h3>
          <div style={{fontSize: '2.5rem', fontWeight: 700}}>${totalStockValue.toFixed(2)}</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card" style={{gridColumn: "span 1"}}>
           <h2>Top Selling Products</h2>
           {topSellingProducts.length === 0 ? (
             <p className="text-muted mt-4">Not enough sales data recorded.</p>
           ) : (
            <div className="table-container mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Units Sold</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topSellingProducts.map((p, idx) => (
                    <tr key={idx}>
                      <td style={{fontWeight: 500}}>{p.name}</td>
                      <td>{p.quantity}</td>
                      <td>${p.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
           )}
        </div>

        <div className="card" style={{gridColumn: "span 1"}}>
           <h2>Recent Sales Log</h2>
           {sales.length === 0 ? (
             <p className="text-muted mt-4">Not enough sales data recorded.</p>
           ) : (
             <div className="table-container mt-4" style={{maxHeight: '400px', overflowY: 'auto'}}>
               <table className="table">
                 <thead style={{position: 'sticky', top: 0, zIndex: 10}}>
                   <tr>
                     <th>Date & Time</th>
                     <th>Product</th>
                     <th>Qty</th>
                     <th>Total</th>
                   </tr>
                 </thead>
                 <tbody>
                   {[...sales].reverse().map(sale => (
                     <tr key={sale.id}>
                       <td style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{new Date(sale.date).toLocaleString()}</td>
                       <td>{sale.productName}</td>
                       <td>{sale.quantity}</td>
                       <td>${sale.total.toFixed(2)}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Reports;