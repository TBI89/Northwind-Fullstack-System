import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import reportWebVitals from './reportWebVitals';
import './index.css';
import interceptors from './Utils/Interceptors';

// Register interceptor:
interceptors.create();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
<Router>
    <Layout />
  </Router>
)

reportWebVitals();
