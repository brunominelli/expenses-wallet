import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleButton = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const maxLength = 5;
    if (regex.test(email) && password.length > maxLength) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleLogin = (email) => {
    const { history, dispatchUserEmail } = this.props;
    dispatchUserEmail(email);
    history.push('/carteira');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleButton);
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <form>
        <div>
          <input
            type="email"
            name="email"
            value={ email }
            placeholder="Email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={ password }
            placeholder="Senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </div>
        <button
          type="button"
          value={ email }
          disabled={ isDisabled }
          onClick={ (e) => this.handleLogin(e.target.value) }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserEmail: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  dispatchUserEmail: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
