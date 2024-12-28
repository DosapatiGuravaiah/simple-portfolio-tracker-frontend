// src/components/StockTable.js
import React from 'react';

function StockTable({ stocks, onEdit, onDelete }) {
  return (
    <table className="stock-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.id}>
            <td>{stock.name}</td>
            <td>{stock.quantity}</td>
            <td>{stock.price}</td>
            <td>
              <button onClick={() => onEdit(stock)}>Edit</button>
              <button onClick={() => onDelete(stock.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StockTable;
