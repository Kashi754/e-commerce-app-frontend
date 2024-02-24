import { Link } from 'react-router-dom';
import './admin.css';

export function Admin() {
  return (
    <main className='admin-page'>
      <div className='admin-links'>
        <h5>Admin Dashboard</h5>
        <Link to='/admin/users'>Users</Link>
        <Link to='/admin/orders'>Orders</Link>
        <Link to='/admin/inventory'>Inventory</Link>
      </div>
    </main>
  );
}
