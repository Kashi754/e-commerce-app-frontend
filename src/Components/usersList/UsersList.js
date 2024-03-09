import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import './usersList.css';

export function UsersList({ users, editUser, deleteUser, searchTerm }) {
  const [editing, setEditing] = useState(null);
  const [userToEdit, setUserToEdit] = useState({
    email: '',
    role: 'user',
  });
  const dispatch = useDispatch();

  function handleEdit(e) {
    e.preventDefault();

    const user = users.find((user) => user.id === e.target.id);
    const userEmail = user.email;
    const userRole = user.role;

    if (userToEdit.email === userEmail && userToEdit.role === userRole) {
      setEditing(null);
      setUserToEdit({
        email: '',
        role: 'user',
      });
    } else {
      dispatch(
        editUser({
          userId: e.target.id,
          body: {
            email: userToEdit.email || userEmail,
            role: userToEdit.role || userRole,
          },
          filter: searchTerm,
        })
      );
      setUserToEdit({
        email: '',
        role: '',
      });
      setEditing(null);
    }
  }

  function handleDelete(id) {
    dispatch(deleteUser({ userId: id, filter: searchTerm }));
    setUserToEdit({
      email: '',
      role: '',
    });
    setEditing(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserToEdit((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className='users-list'>
      {}
      {users.map((user) => {
        return editing !== user.id ? (
          <section
            key={user.id}
            className='user-item'
          >
            <div className='user-section'>
              <h3>USER ID</h3>
              <h4>{user.id}</h4>
            </div>
            <div className='user-section'>
              <h3>USERNAME</h3>
              <h4>{user.username}</h4>
            </div>
            <div className='user-section'>
              <h3>EMAIL</h3>
              <h4>{user.email}</h4>
            </div>
            <div className='user-section'>
              <h3>NAME</h3>
              <h4>{user.first_name + ' ' + user.last_name}</h4>
            </div>
            <div className='user-section'>
              <h3>ROLE</h3>
              <h4>{user.role}</h4>
            </div>
            <button
              className='edit-btn'
              onClick={() => {
                setEditing(user.id);
                setUserToEdit({
                  email: user.email,
                  role: user.role,
                });
              }}
            >
              Edit User
            </button>
          </section>
        ) : (
          <form
            key={user.id}
            id={user.id}
            className='user-item'
            onSubmit={handleEdit}
          >
            <button
              type='button'
              className='delete-btn icon-btn'
              onClick={() => handleDelete(user.id)}
              aria-label='Delete User'
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <div className='user-section'>
              <h3>USER ID</h3>
              <h4>{user.id}</h4>
            </div>
            <div className='user-section'>
              <h3>USERNAME</h3>
              <h4>{user.username}</h4>
            </div>
            <div className='user-section'>
              <label htmlFor='email'>EMAIL</label>
              <input
                type='text'
                id='email'
                name='email'
                placeholder={user.email}
                value={userToEdit.email}
                onChange={handleChange}
              />
            </div>
            <div className='user-section'>
              <h3>NAME</h3>
              <h4>{user.first_name + ' ' + user.last_name}</h4>
            </div>
            <div className='user-section'>
              <label htmlFor='role'>Admin?</label>
              <input
                type='checkbox'
                id='role'
                name='role'
                value={userToEdit.role}
                checked={userToEdit.role === 'admin'}
                onChange={(e) => {
                  setUserToEdit((prev) => {
                    const newValue =
                      e.target.value === 'admin' ? 'user' : 'admin';
                    return { ...prev, role: newValue };
                  });
                }}
              />
            </div>
            <button
              className='submit-btn icon-btn'
              type='submit'
              aria-label='Submit'
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              className='cancel-btn icon-btn'
              type='button'
              onClick={() => setEditing(null)}
              aria-label='Cancel'
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </form>
        );
      })}
    </div>
  );
}
