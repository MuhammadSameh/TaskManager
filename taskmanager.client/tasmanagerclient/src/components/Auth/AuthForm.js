import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context'
import {useNavigate, userNavigate} from 'react-router-dom';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    

    if(isLogin){
      fetch(
        'https://localhost:44309/api/User/Login',
      {
        method: 'Post',
        body: JSON.stringify({
          Email: enteredEmail,
          Password: enteredPassword
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }      
      ).then(res => {
        if(res.ok){
          res.json().then(data => {
            console.log(data);
            authCtx.login(data.token, data.id, data.role);
            if(data.role == 'admin'){
              navigate('/Admin')
            } else{
              navigate('/Employee')
            }
          })
          
        } else {
          res.json().then(data => console.log(data))
        }
      });

    } else {
      const enteredName = nameInputRef.current.value;
      fetch(
        'https://localhost:44309/api/User/Register',
      {
        method: 'Post',
        body: JSON.stringify({
          UserName: enteredName,
          Email: enteredEmail,
          Password: enteredPassword
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }      
      ).then(res => {
        if(res.ok){
          setIsLogin(true)
        } else {
          res.json().then(data => console.log(data))
        }
      });
    }
  }

  

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && <div className={classes.control}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' required ref={nameInputRef} />
        </div>}
        
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
