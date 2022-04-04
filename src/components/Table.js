import React from 'react';
import propTypes from 'prop-types';
import tableHeaders from '../data/tableHeaders';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
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
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.any).isRequired,
};

export default Table;
