import React, { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./loginDetailPage.css";

const RegisterForm = () => {
  const { register, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setnombre] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [isAnfitrion, setIsAnfitrion] = useState(false);
  
  const tipo = isAnfitrion ? "ANFITRION" : "HUESPED";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const success = await register(nombre, email, tipo, password);
    if (success) {
      alert("Registro exitoso");
      navigate("/loginK");
    }
  };

  return (
      <div className="login-container">
          <div className="login-card">
              <h2 className="login-title">Crear Cuenta</h2>
              <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                      <label htmlFor="Nombre">Nombre</label>
                      <input
                          type="nombre"
                          id="nombre"
                          placeholder="Ingresa tu nombre"
                          value={nombre}
                          onChange={(e) => setnombre(e.target.value)}
                          required
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="email">Correo electrónico</label>
                      <input
                          type="email"
                          id="email"
                          placeholder="Ingresa tu correo"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="password">Contraseña</label>
                      <input
                          type="password"
                          id="password"
                          placeholder="Ingresa tu contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                      <input
                          type="password"
                          id="confirmPassword"
                          placeholder="Repite tu contraseña"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="isAnfitrion">¿Eres anfitrión?</label>
                          <input
                              type="checkbox"
                              id="isAnfitrion"
                              checked={isAnfitrion}
                              onChange={(e) => setIsAnfitrion(e.target.checked)}
                          />
                  </div>
                  {error && <p className="error-message">{error}</p>}
                  <button type="submit" className="login-button">
                      Registrarse
                  </button>
              </form>
              <p className="register-text">
                  ¿Ya tienes una cuenta?{" "}
                  <button
                      type="button"
                      className="register-button"
                      onClick={() => navigate("/loginK")}
                  >
                      Inicia sesión
                  </button>
              </p>
          </div>
      </div>
  );
};

export default RegisterForm;
