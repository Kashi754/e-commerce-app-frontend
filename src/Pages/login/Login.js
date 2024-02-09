import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LoginForm } from "../../Components/loginForm/LoginForm";
import { login, selectError, selectIsError, selectIsLoggedIn } from "../user/userSlice";
import './login.css';

export function Login () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const [formData, setFormData] = useState({username: "", password: ""});
  const url = process.env.REACT_APP_SERVER_URL;

  const google = () => {
    window.open(`http://${url}/login/google`, "_self");
  }

  const facebook = () => {
    window.open(`http://${url}/login/facebook`, "_self");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(formData));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  }

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <main className="login">
      <div className="login-field">
        <h1 className='login-title'>Choose a Login Method</h1>
        <div className="wrapper">
          <div className="left">
            <div className="loginButton google" onClick={google}>
              <img src='/images/google.png' alt="" className="icon" />
              Google
            </div>
            <div className="loginButton facebook" onClick={facebook}>
              <img src='/images/facebook.png' alt="" className="icon" />
              Facebook
            </div>
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
            <LoginForm 
              formData={formData} 
              handleSubmit={handleSubmit} 
              handleChange={handleChange}
              isError={isError}
              error={error}
            />
        </div>
      </div>
    </main>
  );
}