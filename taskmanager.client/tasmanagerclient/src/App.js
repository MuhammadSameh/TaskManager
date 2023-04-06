import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<AuthPage/>}>
          
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
