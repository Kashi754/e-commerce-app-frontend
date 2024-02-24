import { useState } from 'react';
import { EditProductForm } from '../editProductForm/EditProductForm';
import './InventoryCard.css';
import { formatMoney } from 'accounting-js';

export function InventoryCard({ product }) {
  const [editing, setEditing] = useState(false);

  return !editing ? (
    <div className='inventory-card'>
      <div className='inventory-card-info'>
        <h5>{product.name}</h5>
        <h5>{product.id}</h5>
      </div>
      <p>{product.description}</p>
      <div className='inventory-card-info'>
        <span>
          <h5>Price: </h5>
          <h6>{formatMoney(product.price)}</h6>
        </span>
        <span>
          <h5>In Stock: </h5>
          <h6>{product.qty_in_stock}</h6>
        </span>
      </div>
      <button
        type='button'
        onClick={() => setEditing(true)}
      >
        Edit
      </button>
    </div>
  ) : (
    <EditProductForm
      product={product}
      handleCancel={() => setEditing(false)}
    />
  );
}
