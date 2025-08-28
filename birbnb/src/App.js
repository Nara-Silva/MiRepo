import HomePage from './Features/Home/HomePage';
import AlojamientoDetailPage from './Features/Alojamiento/AlojamientoDetailPage.js';
import NotificationDetailPage from './Features/Notificaciones/NotificationDetailPage';
import ReservaDetailPage from './Features/Reserva/ReservaDetailPage';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {createTheme, ThemeProvider} from "@mui/material";
import ResultadosDetailPage from './Features/ResultadosBusqueda/ResultadosDetailPage.js';
import { FiltrosProvider } from './Filtros/FiltrosContext.js';
import { ReservaProvider } from './Features/Reserva/ReservaContext.js';
import ReservasPorUsuarioDetailPage from './Features/Reserva/ReservasPorUsuarioDetailPage.js';
import Administradores from './Features/Administradores/Administradores.js';
// import Layout from './Features/Layout/Layout.js'
import MisAlojamientos from './Components/MisAlojamientos/MisAlojamientos';
import LoginForm from './Features/LoginPage/loginDetailPage.js';
import RegisterForm from './Features/LoginPage/register.js';


const theme = createTheme({
palette: {
 primary: { main: '#0060a3' },
 secondary: { main: '#b34a6ffd' },
 background: { default: '#f3eaf1' },
}

})



function App() {
  return (
      <div className="App">
        <ThemeProvider theme={theme}>
            <ReservaProvider>
              <FiltrosProvider>
                <BrowserRouter>
                  <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="/resultados" element={<ResultadosDetailPage />} />
                    <Route path="/alojamientos/:_id" element={<AlojamientoDetailPage />} />
                    <Route path="/alojamientos/:nombre" element={<AlojamientoDetailPage />} />
                    <Route path="/notificaciones" element={<NotificationDetailPage />} />
                    <Route path="/reservas" element={<ReservasPorUsuarioDetailPage />} />
                    <Route path="/reserva/:idAlojamiento" element={<ReservaDetailPage />} />
                    <Route path="/admin" element={<Administradores />} />
                    <Route path="/loginK" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />}/>
                    <Route path="/mis-Alojamientos" element={<MisAlojamientos />} />
                  </Routes>
                </BrowserRouter>
              </FiltrosProvider>
            </ReservaProvider>
        </ThemeProvider>
      </div>
  );
}

export default App;