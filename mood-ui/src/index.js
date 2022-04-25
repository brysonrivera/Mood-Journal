import { render } from "react-dom";
import './index.css';
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
    </Routes>
  </BrowserRouter>,
  rootElement
);
