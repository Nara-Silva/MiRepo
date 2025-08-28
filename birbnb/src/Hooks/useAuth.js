import { useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/usuarios/login`, {
        email,
        password
      });

      const token = response.data.token;
      setToken(token);
      localStorage.setItem("token", token); 
      return true;
    } catch (err) {
      setError("Email o contraseña inválidos");
      console.error("Login error:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const getAuthHeader = () => ({
    Authorization: `Bearer ${token}`
  });

  const register = async (nombre, email, tipo, password) => {
    try {
      setError(null);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/usuarios/register`, {
        nombre,
        email,
        tipo,
        password
      });
      console.log("La respuesta del post de registro es:", response.data);
      return true;
    } catch (err) {
      if(err.response && err.response.status === 400){
        setError(err.response.data.message);
      } else
      {
        setError("Error al registrar el usuario")
      }
      return false;
    }
  };

  return { token, login, register, logout, error, getAuthHeader };
};

