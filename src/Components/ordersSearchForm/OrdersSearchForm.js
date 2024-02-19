import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadAdminOrders } from '../../Pages/admin/adminOrders/adminOrdersSlice';
import './ordersSearchForm.css';

const OrdersSearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      dispatch(loadAdminOrders(searchTerm));
    }
  };

  const handleStatusFilter = (filter) => {
    dispatch(loadAdminOrders(filter));
  };

  return (
    <form
      className='orders-search-form'
      onSubmit={handleSearch}
    >
      <fieldset className='orders-search-fieldset'>
        <input
          type='text'
          placeholder='Search by Order ID'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type='submit'>Search</button>
      </fieldset>
      <fieldset className='orders-status-filter'>
        <button
          type='button'
          className='pending-button'
          onClick={() => handleStatusFilter('pending')}
        >
          Pending
        </button>
        <button
          type='button'
          className='shipped-button'
          onClick={() => handleStatusFilter('shipped')}
        >
          Shipped
        </button>
        <button
          type='button'
          className='delivered-button'
          onClick={() => handleStatusFilter('delivered')}
        >
          Delivered
        </button>
      </fieldset>
    </form>
  );
};

export default OrdersSearchForm;
