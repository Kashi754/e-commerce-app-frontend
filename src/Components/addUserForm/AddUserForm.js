import { useState } from 'react';
import { postApi } from '../../utilities/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import './addUserForm.css';

export function AddUserForm({ loadAdminUsers, searchTerm }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: '',
  });
  const dispatch = useDispatch();

  function handleFormChange(e) {
    const { name, value } = e.target;
    setUserFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleAddUser(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_SERVER_URL;
    const serverUrl = `${url}/register`;

    try {
      await postApi(serverUrl, userFormData);
      setUserFormData({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        role: 'user',
      });
      dispatch(loadAdminUsers(searchTerm));
    } catch (err) {
      console.error('Error %d: ' + (await err.message), await err.status);
      return;
    }
  }

  function handleClick(e) {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  }

  return (
    <section className='registration-container'>
      <h2>Add User</h2>
      <form
        className='registration-form'
        onSubmit={handleAddUser}
      >
        <fieldset className='username-field field'>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            id='username'
            name='username'
            value={userFormData.username}
            onChange={handleFormChange}
          />
        </fieldset>
        <fieldset className='email-field field'>
          <label htmlFor='email'>Email: </label>
          <input
            type='email'
            id='email'
            name='email'
            value={userFormData.email}
            onChange={handleFormChange}
          />
        </fieldset>
        <fieldset className='password-field'>
          <div className='password1-field field'>
            <label htmlFor='password'>Password: </label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id='password'
              name='password'
              value={userFormData.password}
              onChange={handleFormChange}
            />
            <button
              className='show-password-button'
              type='button'
              onClick={handleClick}
            >
              {<FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />}
            </button>
          </div>
        </fieldset>

        <fieldset className='first-name-field field'>
          <label htmlFor='first-name'>First Name: </label>
          <input
            type='text'
            id='first-name'
            name='first_name'
            value={userFormData.first_name}
            onChange={handleFormChange}
          />
        </fieldset>
        <fieldset className='last-name-field field'>
          <label htmlFor='last-name'>Last Name: </label>
          <input
            type='text'
            id='last-name'
            name='last_name'
            value={userFormData.last_name}
            onChange={handleFormChange}
          />
        </fieldset>
        <fieldset className='role-field field'>
          <label
            htmlFor='role'
            id='role-label'
          >
            Admin?:{' '}
          </label>
          <input
            type='checkbox'
            id='role'
            name='role'
            value={userFormData.role}
            checked={userFormData.role === 'admin'}
            onChange={(e) =>
              setUserFormData((prev) => {
                const newValue = e.target.value === 'admin' ? 'user' : 'admin';
                return { ...prev, role: newValue };
              })
            }
          />
        </fieldset>
        <button
          className='registration-submit-button'
          type='submit'
        >
          Register User
        </button>
      </form>
    </section>
  );
}
