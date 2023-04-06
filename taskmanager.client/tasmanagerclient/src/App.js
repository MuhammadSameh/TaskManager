import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import EmployeePage from './pages/EmployeePage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<AuthPage/>}>
        
        </Route>
        <Route path='/Admin' element = {<AdminPage/>}/>
        <Route path='/Employee' element = {<EmployeePage/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
