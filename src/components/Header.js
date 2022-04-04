import React from 'react';
import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, total } = this.props;

    return (
      <header className="header">
        <h1>TrybeWallet</h1>
        <div className="row">
          <p data-testid="email-field">{ `Olá, ${email}` }</p>
          <p data-testid="total-field">
            {total.toFixed(2)}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: propTypes.string.isRequired,
  total: propTypes.number.isRequired,
};

export default Header;
