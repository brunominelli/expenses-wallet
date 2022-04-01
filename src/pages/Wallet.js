import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency } from '../actions';
import checkoutMethods from '../data/checkoutMethods';
import categories from '../data/categories';

class Wallet extends React.Component {
  componentDidMount() {
    this.handleCurrencies();
  }

  handleCurrencies = () => {
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <>
        <header className="header">
          <h1>TrybeWallet</h1>
          <div className="row">
            <p data-testid="email-field">{ `Olá, ${email}` }</p>
            {' '}
            <p data-testid="total-field">{`Despesa Total: R$ ${0}`}</p>
            {' '}
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </header>
        <form>
          <label htmlFor="description-input">
            Descrição:
            {' '}
            <input
              type="text"
              id="description-input"
              name="description-input"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="tag-input">
            Categoria:
            {' '}
            <select
              id="tag-input"
              name="tag-input"
              data-testid="tag-input"
            >
              { categories.map((category) => (
                <option key={ category } value={ category }>{category}</option>))}
            </select>
          </label>
          <label htmlFor="value-input">
            Valor:
            {' '}
            <input
              type="text"
              id="value-input"
              name="value-input"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            {' '}
            <select
              id="currency-input"
              name="currency-input"
            >
              { currencies.map((currency) => (
                <option key={ currency } value={ currency }>{currency}</option>))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de Pagamento:
            {' '}
            <select
              id="method-input"
              name="method-input"
              data-testid="method-input"
            >
              { checkoutMethods.map((checkout) => (
                <option key={ checkout } value={ checkout }>{checkout}</option>))}
            </select>
          </label>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: () => dispatch(fetchCurrency()),
});

Wallet.propTypes = {
  email: propTypes.string.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  dispatchCurrencies: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
