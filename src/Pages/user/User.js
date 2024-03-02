import { quantum } from 'ldrs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './user.css';
import { selectError, selectIsLoading, selectUser } from './userSlice';
import { PasswordChangeForm } from '../../Components/passwordChangeForm/PasswordChangeForm';
import { ProfileForm } from '../../Components/profileForm/ProfileForm';
quantum.register();

export function User() {
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const [editMode, setEditMode] = useState(false);

  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    if (Object.values(error).join('')) {
      Object.keys(error).forEach((key) => {
        if (error[key]) {
          console.error('Error %d: ' + error[key].message, error[key].status);
        }
      });
    }
  }, [error]);

  if (isLoading) {
    return (
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
    );
  }

  if (!editMode) {
    return (
      <main className='user-profile'>
        <div className='profile-container'>
          <h2>User Profile</h2>
          <section className='profile-section'>
            <h4>
              <span className='label'>Username: </span>
              {user.username}
            </h4>
            <h4>
              <span className='label'>First Name: </span>
              {user.first_name}
            </h4>
            <h4>
              <span className='label'>Last Name: </span>
              {user.last_name}
            </h4>
            <h4>
              <span className='label'>Email Address: </span>
              {user.email}
            </h4>
            {!changePassword ? (
              <>
                {user.role !== 'admin' ? (
                  <Link to='/orders'>Order History</Link>
                ) : (
                  <Link to='/admin'>Admin Panel</Link>
                )}
                <Link
                  to=''
                  onClick={() => setChangePassword(true)}
                >
                  Change Password
                </Link>
                <button
                  type='button'
                  className='edit-button'
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <PasswordChangeForm setChangePassword={setChangePassword} />
            )}
          </section>
        </div>
      </main>
    );
  } else {
    return (
      <main className='user-profile'>
        <div className='profile-container'>
          <h2>User Information</h2>
          <ProfileForm
            user={user}
            setEditMode={setEditMode}
          />
        </div>
      </main>
    );
  }
}
