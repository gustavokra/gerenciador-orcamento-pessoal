import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { signInWithEmail } from '../../firebase';
import { EnumPaginas } from '../../@types/EnumPaginas';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    try {
      await signInWithEmail(email, password)
      navigate("/dashboard")
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <section id='login'>
      <div className='container content'>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <Button text='Login' secondary={true} onClick={handleEmailLogin} />
          {error && <p className="auth-error">{error}</p>}
          <a href={EnumPaginas.register} className="reverse-color ml-lg">Cadastre-se</a>
      </div>
    </section>
  );
};

export default Login;