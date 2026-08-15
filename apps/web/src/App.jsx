import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import AppRoute from './routes/AppRoute';

function App() {
  return (
    <BrowserRouter>
      <AppRoute />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      />
    </BrowserRouter>
  );
}

export default App;