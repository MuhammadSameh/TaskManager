import { Link, useNavigate } from 'react-router-dom';
import {useContext} from 'react'
import AuthContext from '../../store/auth-context'
import classes from './MainNavigation.module.css';
import AddTaskButton from './AddTaskButton';
import Button from 'react-bootstrap/Button';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate();
  const isLogged = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout()
    navigate('/');
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>

          {!isLogged && <li>
            <Link to='/'>Login</Link>
          </li>
          }
          

          {isLogged && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}

          <li>
          <Button variant="primary">Add-Task</Button>
          </li>
          
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;