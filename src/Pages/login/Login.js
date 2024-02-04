import { useDispatch, useSelector } from "react-redux";
import { login } from "../user/userSlice";
import { selectIsLoggedIn } from "../user/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function Login () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [formData, setFormData] = useState({username: "", password: ""});

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
      <form className="login-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          placeholder="Username" 
        />
        <input 
          type="text" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          placeholder="Password" 
        />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}