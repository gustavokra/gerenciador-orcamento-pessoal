import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpWithEmail } from '../../firebase';
import "./Register.css";
import Button from '../../components/Button/Button';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await signUpWithEmail(email, password);
      navigate("/login")
    } catch (err) {
      setError('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <section id='register'>
    <div className="container content">
        <h2>Cadastro</h2>
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
        <Button text='Cadastrar' secondary={true} onClick={handleRegister} />
        {error && <p className="auth-error">{error}</p>}
        <a href="/login" className="auth-link">Já tem uma conta? Faça login</a>
    </div>
    </section>
  );
};

export default Register;
