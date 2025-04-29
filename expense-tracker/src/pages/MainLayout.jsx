import React, { useState } from 'react';
import '../styles/mainLayout.css';
import UserDashboard from './UserDashboard';
import bankingImage from '../assets/online-banking.png';

const MainLayout = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="main-container">
      <div className="left-section">
        <h1>Bienvenido a Expense-Traker</h1>
        <img src={bankingImage} alt="Online Banking Illustration" className="banking-image" />
      </div>

      <div className="right-section">
        <nav className="navbar">
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Service</a>
          <a href="#">Contact</a>
        </nav>

        <div className="form-container">
          <h2>{isLogin ? 'Inicia Sesión' : 'Crear Cuenta'}</h2>
          <h3>Que tu cartera deje de llorar.</h3>

          <form>
            {!isLogin && (
              <>
                <input type="text" placeholder="Nombre" required />
                <input type="text" placeholder="Apellido" required />
                <input type="text" placeholder="Username" required />
                <input type="email" placeholder="Email" required />
                <input type="text" placeholder="Teléfono" required />
                <input type="password" placeholder="Contraseña" required />
                <input type="password" placeholder="Confirmar Contraseña" required />
                <input type="file" accept="image/*" />
                
              </>
            )}
            {isLogin && (
              <>
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                
              </>
            )}
            
            <button type="submit" className="login-button">
              {isLogin ? 'Login 🔒' : 'Register 📝'}
            </button>
          </form>

          <p className="toggle-text">
            {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
            <span onClick={toggleForm}>
              {isLogin ? 'Registrate' : 'Inicia Sesión'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
