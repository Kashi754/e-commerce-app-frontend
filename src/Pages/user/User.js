import { Link } from 'react-router-dom';
import { selectUser, editUserData, selectError, selectIsError, selectIsLoading } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './user.css';

export function User () {
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const [ editMode, setEditMode ] = useState(false);
  const [ userToEdit, setUserToEdit ] = useState({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    username: user.username
  });
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (userToEdit.username !== user.username ||
      userToEdit.first_name !== user.first_name ||
      userToEdit.last_name !== user.last_name ||
      userToEdit.email !== user.email) {
        dispatch(editUserData(userToEdit));
        setUserToEdit({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          username: user.username
        });
    } 

    setEditMode(false);
  }

  function handleChange(e) {
    const updatedUser = {...userToEdit};
    updatedUser[e.target.name] = e.target.value;
    setUserToEdit({...updatedUser});
  }

  if(isLoading) {
    return (
      <div data-testid='loader' className="loader">
          {<l-quantum
              size={300}
              speed={1}
              color='#000000'
          />}
      </div>
    )
  }

  // if(isError) {
  //   return (
  //       <div className="error">
  //           <p role='alert'>{error}</p>
  //       </div>
  //   )
  // }

  if(!editMode) {
    return (
      <main className='user-profile'>
        <div className='profile-container'>
          <h2>User Information</h2>
          <section className='profile-form'>
            <h4><span className='label'>Username: </span>{user.username}</h4>
            <h4><span className='label'>First Name: </span>{user.first_name}</h4>
            <h4><span className='label'>Last Name: </span>{user.last_name}</h4>
            <h4><span className='label'>Email: </span>{user.email}</h4>
            <Link to="/orders">Order History</Link>
            <div className='button-container'>
              <button type="button" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            </div>
          </section>
        </div>
      </main>
    )
  } else {
    return (
      <main className='user-profile'>
        <div className='profile-container'>
          <h2>User Information</h2>
          <form className='profile-form' onSubmit={handleSubmit}>
            <p>
              <label htmlFor='username'>Username: </label>
              <input 
                type='text' 
                id='username' 
                name='username' 
                onChange={handleChange} 
                value={userToEdit.username} 
              />
            </p>
            <p>
              <label htmlFor='first-name'>First Name: </label>
              <input 
                type='text' 
                id='first-name' 
                name='first_name' 
                onChange={handleChange} 
                value={userToEdit.first_name} 
              />
            </p>
            <p>
              <label htmlFor='last-name'>Last Name: </label>
              <input 
                type='text' 
                id='last-name' 
                name='last_name' 
                onChange={handleChange} 
                value={userToEdit.last_name} 
              />
            </p>
            <p>
              <label htmlFor='email'>Email: </label>
              <input 
                type='email'
                id='email' 
                name='email' 
                onChange={handleChange} 
                value={userToEdit.email} 
              />
            </p>
            <div className='button-container'>
              <button type='submit'>Save Changes</button>
            </div>
          </form>
        </div>
      </main>
    )
  }
}