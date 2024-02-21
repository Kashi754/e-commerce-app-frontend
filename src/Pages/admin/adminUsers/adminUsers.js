import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { UsersSearchForm } from '../../../Components/usersSearchForm/UsersSearchForm';
import { UsersList } from '../../../Components/usersList/UsersList';
import { AddUserForm } from '../../../Components/addUserForm/AddUserForm';
import {
  selectUsers,
  selectIsLoading,
  loadAdminUsers,
  deleteUser,
  editUser,
} from './adminUsersSlice';
import './adminUsers.css';
import { quantum } from 'ldrs';
quantum.register();

export function AdminUsers() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectIsLoading);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(loadAdminUsers());
  }, [dispatch]);

  return (
    <main className='admin-users'>
      <h1>Users</h1>
      <UsersSearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {isLoading ? (
        <l-quantum
          size={300}
          speed={1}
          color='#000000'
        />
      ) : (
        <UsersList
          users={users}
          editUser={editUser}
          deleteUser={deleteUser}
          searchTerm={searchTerm}
        />
      )}
      <AddUserForm
        loadAdminUsers={loadAdminUsers}
        searchTerm={searchTerm}
      />
    </main>
  );
}
