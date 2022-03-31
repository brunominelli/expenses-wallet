import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch, currencies } = this.props;
    dispatch(fetchCurrency());
    console.log(currencies);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{ `Olá, ${email}` }</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  email: propTypes.string.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
