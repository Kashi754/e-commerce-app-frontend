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
  selectError,
} from './adminUsersSlice';
import './adminUsers.css';
import { quantum } from 'ldrs';
import { selectUser } from '../../user/userSlice';
import { NotFound } from '../../notFound/NotFound';
quantum.register();

export function AdminUsers() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [searchTerm, setSearchTerm] = useState('');

  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.role === 'admin') dispatch(loadAdminUsers());
  }, [dispatch, user]);

  if (user.role !== 'admin') {
    return <NotFound />;
  }

  useEffect(() => {
    if (Object.values(error).join('')) {
      Object.keys(error).forEach((key) => {
        if (error[key]) {
          console.error(error[key].message);
        }
      });
    }
  }, [error]);

  return (
    <main className='admin-users'>
      <h1>Users</h1>
      <UsersSearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {isLoading ? (
        <div
          data-testid='loader'
          className='loader'
        >
          {
            <l-quantum
              size={300}
              speed={1}
              color='#000000'
            />
          }
        </div>
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
