import { Link } from 'react-router-dom';

export function Admin() {
  return (
    <main className='admin-page'>
      {/* TODO: Implement users and inventory paths */}
      <Link to='/admin/users'>Users</Link>
      <Link to='/admin/orders'>Orders</Link>
      <Link to='/admin/inventory'>Inventory</Link>
    </main>
  );
}
