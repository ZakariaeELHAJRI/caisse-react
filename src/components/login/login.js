import React , {useState} from "react";
import './login.css'
import { Link ,useHistory } from "react-router-dom";
import axios from "axios";

// import localStorage from 'local-storage';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost/api_orders/api/index.php/login', {
        email: email,
        password: password
      });
      if (response.data.success === true) {
        history.push('/gestionnaire/users'); 
        setToken(response.data.token);
        // usign local storage to store the token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        console.log(localStorage.getItem('token'));
        console.log(localStorage.getItem('role'));
        setRole(response.data.role);
        setErrorMessage(''); 
        setIsAuthenticated(true);
      } else {
        setErrorMessage(response.data.message);
        setToken('');
        setRole('');
        setIsAuthenticated(false);
        history.push('/');
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
<>
<div class="login-box">
  <h2>Login</h2>
  <form>
    <div class="user-box">
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Email</label>
    </div>
    <div class="user-box">
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Password</label>
    </div>
    
        <Link to="/gestionnaire/users">
          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </Link>
        <button type="submit" onClick={handleSubmit}>Submit</button>
  </form>
</div>
</>
  );
};

export default Login;