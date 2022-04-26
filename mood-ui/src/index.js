import { render } from "react-dom";
import './index.css';
import Stats from "./pages/Stats"
import Logs from "./pages/Logs"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App';
const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/logs" element={<Logs />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
