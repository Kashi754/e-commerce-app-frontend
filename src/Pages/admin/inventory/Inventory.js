import { useSelector } from 'react-redux';
import { AddProductForm } from '../../../Components/addProductForm/AddProductForm';
import { InventoryList } from '../../../Components/inventoryList/InventoryList';
import './inventory.css';
import { selectUser } from '../../user/userSlice';
import { NotFound } from '../../notFound/NotFound';

export function Inventory() {
  const user = useSelector(selectUser);

  if (user.role !== 'admin') {
    return <NotFound />;
  }
  return (
    <main className='admin-inventory'>
      <AddProductForm />
      <InventoryList />
    </main>
  );
}
