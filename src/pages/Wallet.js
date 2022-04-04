import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, setExpense } from '../actions';
import checkoutMethods from '../data/checkoutMethods';
import categories from '../data/categories';
import Header from '../components/Header';
import fetchCurrencyAPI from '../services/economyAPI';
import Table from '../components/Table';

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
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  handleTotalExpenses = () => {
    const { expenses } = this.props;
    const result = expenses.map((expense) => {
      const total = +expense.value * +expense.exchangeRates[expense.currency].ask;
      return total;
    });
    return result.reduce((acc, curr) => acc + curr, 0);
  }

  handleAddButton = async () => {
    const { value, currency, method, tag, description } = this.state;
    const { dispatchExpense, expenses } = this.props;
    const id = expenses.length;
    const object = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: await fetchCurrencyAPI().then((json) => json),
    };

    expenses.push(object);
    dispatchExpense(expenses);
    this.setState({
      value: '0',
      currency: 'USD',
      method: 'Cartão de Crédito',
      tag: 'Alimentação',
      description: '',
    });

    this.handleTotalExpenses();
  }

  handleDeleteButton = (id) => {
    const { dispatchExpense, expenses } = this.props;
    const newExpenses = expenses.reduce((acc, curr) => {
      if (curr.id !== +id) acc.push(curr);
      return acc;
    }, []);
    dispatchExpense(newExpenses);
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
        <Header email={ email } total={ total } />
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
            onClick={ this.handleAddButton }
            className="btn"
          >
            Adicionar Despesa
          </button>
        </form>
        <Table expenses={ expenses } handleDeleteButton={ this.handleDeleteButton } />
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
  dispatchExpense: (expense) => dispatch(setExpense(expense)),
});

Wallet.propTypes = {
  email: propTypes.string.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  expenses: propTypes.arrayOf(propTypes.any).isRequired,
  dispatchCurrencies: propTypes.func.isRequired,
  dispatchExpense: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
