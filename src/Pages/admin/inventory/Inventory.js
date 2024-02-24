import { AddProductForm } from '../../../Components/addProductForm/AddProductForm';
import { InventoryList } from '../../../Components/inventoryList/InventoryList';
import './inventory.css';

export function Inventory() {
  return (
    <main className='admin-inventory'>
      <h1>Inventory</h1>
      <AddProductForm />
      <InventoryList />
    </main>
  );
}
