import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginform.css'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would normally check the username and password
    // For simplicity, let's assume any non-empty input is correct
    if (username && password) {
      navigate('/Dashboard');
    } else {
      alert('Please enter a valid username and password');
    }
  };

  return (
    <div>
      <div className='tog'>
        <p>❝𝐇𝐞𝐲 𝐠𝐮𝐲𝐬, 𝐣𝐮𝐬𝐭 𝐬𝐢𝐠𝐧𝐮𝐩 𝐭𝐨 𝐯𝐢𝐞𝐰 𝐭𝐡𝐞 D𝐚𝐬𝐡𝐛𝐨𝐚𝐫𝐝❞</p>
      </div>
    <form onSubmit={handleLogin} className='log'>
      <h1>LOgiN</h1>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className='btn'>SignUp</button>
    </form>
    </div>

  );
};

export default LoginForm;
