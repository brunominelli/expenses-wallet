import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, setExpense } from '../actions';
import checkoutMethods from '../data/checkoutMethods';
import categories from '../data/categories';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '0',
      currency: 'USD',
      method: 'Cartão de Crédito',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    this.handleCurrencies();
  }

  handleCurrencies = () => {
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  handleTotalExpenses = () => {
    const { expenses } = this.props;
    const totalExpenses = expenses
      .reduce((total, price) => total + parseInt(price.value, 10), 0);
    return totalExpenses;
  }

  handleSetExpenses = () => {
    const { value, currency, method, tag, description } = this.state;
    const { dispatchExpenses, expenses } = this.props;
    const id = expenses.length;
    const expense = { id, value, currency, method, tag, description };

    expenses.push(expense);
    dispatchExpenses(expenses);

    this.setState({
      value: '0',
      currency: 'USD',
      method: 'Cartão de Crédito',
      tag: 'Alimentação',
      description: '',
    }, this.handleTotalExpenses);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { email, currencies, expenses } = this.props;
    const total = this.handleTotalExpenses();
    return (
      <>
        <header className="header">
          <h1>TrybeWallet</h1>
          <div className="row">
            <p data-testid="email-field">{ `Olá, ${email}` }</p>
            <p data-testid="total-field">
              {`Despesa Total: R$ ${total}`}
            </p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </header>
        <form className="row">
          <label htmlFor="description-input" className="label">
            Descrição
            <input
              type="text"
              id="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
              className="form-input"
            />
          </label>
          <label htmlFor="tag-input" className="label">
            Categoria
            <select
              id="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
              className="form-input"
            >
              { categories.map((category) => (
                <option key={ category } value={ category }>{category}</option>))}
            </select>
          </label>
          <label htmlFor="value-input" className="label">
            Valor
            <input
              type="number"
              id="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
              className="form-input"
            />
          </label>
          <label htmlFor="currency-input" className="label">
            Moeda
            <select
              id="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
              className="form-input"
            >
              { currencies.map((coin) => (
                <option key={ coin } value={ coin }>{coin}</option>))}
            </select>
          </label>
          <label htmlFor="method-input" className="label">
            Método de Pagamento
            <select
              id="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
              data-testid="method-input"
              className="form-input"
            >
              { checkoutMethods.map((checkout) => (
                <option key={ checkout } value={ checkout }>{checkout}</option>))}
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleSetExpenses }
            className="btn"
          >
            Adicionar despesa
          </button>
        </form>
        <section>
          <div className="row">
            <h2>Descrição</h2>
            <h2>Categoria</h2>
            <h2>Valor</h2>
            <h2>Moeda</h2>
            <h2>Método de Pagamento</h2>
          </div>
          { expenses.map((expense) => (
            <div key={ expense.id } className="row">
              <p>{`${expense.description}`}</p>
              <p>{`${expense.tag}`}</p>
              <p>{`${expense.value}`}</p>
              <p>{`${expense.currency}`}</p>
              <p>{`${expense.method}`}</p>
            </div>
          )) }
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: () => dispatch(fetchCurrency()),
  dispatchExpenses: (expenses) => dispatch(setExpense(expenses)),
});

Wallet.propTypes = {
  email: propTypes.string.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  expenses: propTypes.arrayOf(propTypes.any).isRequired,
  dispatchCurrencies: propTypes.func.isRequired,
  dispatchExpenses: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
