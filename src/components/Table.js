import React from 'react';
import propTypes from 'prop-types';
import tableHeaders from '../data/tableHeaders';

class Table extends React.Component {
  render() {
    const { expenses, handleDeleteButton, handleUpdateButton } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            { tableHeaders.map((header) => <th key={ header }>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{(+expense.value).toFixed(2)}</td>
              <td>
                {expense.exchangeRates[expense.currency].name.split('/')[0]}
              </td>
              <td>
                {
                  parseFloat(
                    expense
                      .exchangeRates[expense.currency]
                      .ask,
                  ).toFixed(2)
                }
              </td>
              <td>
                {
                  (+expense.value
                    * +expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)
                }
              </td>
              <td>Real</td>
              <td className="row">
                <button
                  type="button"
                  data-testid="edit-btn"
                  value={ +expense.id }
                  onClick={ (e) => handleUpdateButton(e.target.value) }
                  className="btn"
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  value={ +expense.id }
                  onClick={ (e) => handleDeleteButton(e.target.value) }
                  className="btn"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.any).isRequired,
  handleDeleteButton: propTypes.func.isRequired,
  handleUpdateButton: propTypes.func.isRequired,
};

export default Table;
