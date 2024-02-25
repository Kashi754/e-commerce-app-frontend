import { useDispatch } from 'react-redux';
import { editUserData } from '../../Pages/user/userSlice';
import { useState } from 'react';

export function ProfileForm({ user, setEditMode }) {
  const dispatch = useDispatch();
  const [userToEdit, setUserToEdit] = useState({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    username: user.username,
  });
  function handleSubmit(e) {
    e.preventDefault();

    if (
      userToEdit.username !== user.username ||
      userToEdit.first_name !== user.first_name ||
      userToEdit.last_name !== user.last_name ||
      userToEdit.email !== user.email
    ) {
      dispatch(editUserData(userToEdit));
      setUserToEdit({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user.username,
      });
    }

    setEditMode(false);
  }

  function handleChange(e) {
    const updatedUser = { ...userToEdit };
    updatedUser[e.target.name] = e.target.value;
    setUserToEdit({ ...updatedUser });
  }

  return (
    <form
      className='profile-form'
      onSubmit={handleSubmit}
    >
      <fieldset className='field'>
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          id='username'
          name='username'
          onChange={handleChange}
          value={userToEdit.username}
        />
      </fieldset>
      <fieldset className='field'>
        <label htmlFor='first-name'>First Name: </label>
        <input
          type='text'
          id='first-name'
          name='first_name'
          onChange={handleChange}
          value={userToEdit.first_name}
        />
      </fieldset>
      <fieldset className='field'>
        <label htmlFor='last-name'>Last Name: </label>
        <input
          type='text'
          id='last-name'
          name='last_name'
          onChange={handleChange}
          value={userToEdit.last_name}
        />
      </fieldset>
      <fieldset className='field'>
        <label htmlFor='email'>Email Address: </label>
        <input
          type='email'
          id='email'
          name='email'
          onChange={handleChange}
          value={userToEdit.email}
        />
      </fieldset>
      <button
        className='save-button'
        type='submit'
      >
        Save Changes
      </button>
    </form>
  );
}
