import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';

import routes from './const/routes.js';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import MainPage from './pages/MainPage/MainPage.jsx';
import './styles/App.css';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.mainPagePath()} element={<MainPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
  