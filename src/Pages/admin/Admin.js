import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../user/userSlice';
import './admin.css';
import { NotFound } from '../notFound/NotFound';

export function Admin() {
  const user = useSelector(selectUser);

  if (user.role !== 'admin') {
    return <NotFound />;
  }

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
