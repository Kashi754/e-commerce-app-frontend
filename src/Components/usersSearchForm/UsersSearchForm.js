import { useDispatch } from 'react-redux';
import { loadAdminUsers } from '../../Pages/admin/adminUsers/adminUsersSlice';
import './usersSearchForm.css';

export function UsersSearchForm({ searchTerm, setSearchTerm }) {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      dispatch(loadAdminUsers(searchTerm));
    } else {
      dispatch(loadAdminUsers());
    }
  };

  const handleStatusFilter = (filter) => {
    dispatch(loadAdminUsers(filter));
  };

  return (
    <form
      className='users-search-form'
      onSubmit={handleSearch}
    >
      <fieldset className='users-search-fieldset'>
        <input
          type='text'
          placeholder='Search by email'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type='submit'>Search</button>
      </fieldset>
      <fieldset className='users-status-filter'>
        <button
          type='button'
          className='user-button'
          onClick={() => handleStatusFilter('user')}
        >
          User
        </button>
        <button
          type='button'
          className='admin-button'
          onClick={() => handleStatusFilter('admin')}
        >
          Admin
        </button>
        <button
          type='button'
          className='all-button'
          onClick={() => handleStatusFilter('')}
        >
          All
        </button>
      </fieldset>
    </form>
  );
}
