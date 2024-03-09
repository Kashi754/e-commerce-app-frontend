import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import validator from 'validator';
import { putApi } from '../../utilities/fetchApi';
import './passwordChangeForm.css';

export function PasswordChangeForm({ setChangePassword }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [correctPassword, setCorrectPassword] = useState(false);
  const [matchedPasswords, setMatchedPasswords] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
  });
  const url = process.env.REACT_APP_SERVER_URL;

  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    verifyPassword(name, value);
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setChangePassword(false);
    setPasswordForm({
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
    });
    setPasswordError(null);
    const serverUrl = `${url}/users/password`;
    // eslint-disable-next-line no-unused-vars
    const { newPassword2, ...body } = passwordForm;

    try {
      await putApi(serverUrl, body);
    } catch (err) {
      setPasswordError(err.message);
      return;
    }
  }

  function verifyPassword(name, value) {
    if (name === 'newPassword') {
      if (
        validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        setCorrectPassword(true);
      } else {
        setCorrectPassword(false);
      }

      if (passwordForm.newPassword2 === value) {
        setMatchedPasswords(true);
      } else {
        setMatchedPasswords(false);
      }
    }

    if (name === 'newPassword2') {
      if (passwordForm.newPassword === value) {
        setMatchedPasswords(true);
      } else {
        setMatchedPasswords(false);
      }
    }
  }

  return (
    <form
      className='change-password-form'
      onSubmit={handlePasswordSubmit}
    >
      <input
        type='text'
        name='username'
        autoComplete='username'
        style={{ display: 'none' }}
      />
      <div className='old-password-field field'>
        <label htmlFor='password2'>Old Password: </label>
        <div className='password-container'>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id='oldPassword'
            name='oldPassword'
            value={passwordForm.oldPassword}
            autoComplete='current-password'
            onChange={handlePasswordChange}
          />
          <button
            className='show-password-button'
            type='button'
            onClick={() => setPasswordVisible((prev) => !prev)}
            aria-label='Show Password'
          >
            {<FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />}
          </button>
        </div>
      </div>
      <div className='new-password1-field field'>
        <label htmlFor='password'>New Password: </label>
        <input
          type={passwordVisible ? 'text' : 'password'}
          id='newPassword'
          name='newPassword'
          value={passwordForm.newPassword}
          autoComplete='new-password'
          onChange={handlePasswordChange}
        />
      </div>
      {!correctPassword && (
        <p className='error-message password-error'>
          Password must contain at least 8 characters including UPPER/lowercase,
          1 number, and 1 special symbol.
        </p>
      )}
      <div className='new-password2-field field'>
        <label htmlFor='password2'>Confirm New Password: </label>
        <input
          type={passwordVisible ? 'text' : 'password'}
          id='newPassword2'
          name='newPassword2'
          value={passwordForm.newPassword2}
          autoComplete='new-password'
          onChange={handlePasswordChange}
        />
      </div>
      {!matchedPasswords && (
        <p className='error-message password-error'>Passwords must match.</p>
      )}
      <div className='password-button-container'>
        <button
          className='password-cancel-button'
          type='button'
          onClick={() => setChangePassword(false)}
        >
          Cancel
        </button>
        <button
          className='password-submit-button'
          type='submit'
          disabled={!correctPassword || !matchedPasswords}
        >
          Submit
        </button>
      </div>
      {passwordError && <p className='error-message'>{passwordError}</p>}
    </form>
  );
}
