import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { LoginForm } from '../../Components/loginForm/LoginForm';
import {
  login,
  selectError,
  selectIsLoggedIn,
  selectIsLoading,
} from '../user/userSlice';
import './login.css';
import { quantum } from 'ldrs';
quantum.register();

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const url = process.env.REACT_APP_SERVER_URL;

  const google = () => {
    window.open(`${url}/login/google`, '_self');
  };

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(formData));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

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

  return (
    <main className='login'>
      <div className='login-field'>
        <h1 className='login-title'>Choose a Login Method</h1>
        <div className='wrapper'>
          <div className='left'>
            <div
              className='loginButton google'
              onClick={google}
            >
              <img
                src='/images/google.png'
                alt=''
                className='icon'
              />
              Google
            </div>
          </div>
          <div className='center'>
            <div className='line' />
            <div className='or'>OR</div>
          </div>
          <LoginForm
            formData={formData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            error={error.login}
          />
        </div>
      </div>
    </main>
  );
}
