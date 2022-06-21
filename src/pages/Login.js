import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
  const [user, setUser] = useState({ password: '', email: '' });
  const [disable, setDisable] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const MIN_LENGTH = 6;
    const { password, email } = user;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateEmail = regexEmail.test(email);
    if (password.length > MIN_LENGTH && validateEmail) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/foods');
  };

  return (
    <section>
      <main>
        <h1>Login</h1>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={ user.email }
              onChange={ handleChange }
              data-testid="email-input"
            />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={ user.password }
              onChange={ handleChange }
              data-testid="password-input"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            data-testid="login-submit-btn"
            disabled={ disable }
            onClick={ handleClick }
          >
            Enter
          </Button>
        </Form>

      </main>
    </section>
  );
}

export default Login;
