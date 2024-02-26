import { useState } from 'react';
  function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
    };
  
    const handleDiscordRegister = () => {
      // Handle Discord registration logic here
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <button type="button" onClick={handleDiscordRegister}>Register with Discord</button>
        <button type="submit">Register</button>
      </form>
    );
  }
  
export default RegisterForm;