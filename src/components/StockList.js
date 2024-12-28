// src/components/StockList.js
import React, { useState, useEffect } from 'react';
import { fetchStocks, deleteStock } from '../api';  // Import the API functions

const StockList = ({ onEditStock }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const loadStocks = async () => {
      try {
        const fetchedStocks = await fetchStocks();  // Fetch stocks
        setStocks(fetchedStocks);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
    loadStocks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteStock(id);  // Call deleteStock function
      setStocks(stocks.filter(stock => stock.id !== id));  // Update state after deletion
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  return (
    <div className="stock-list">
      <h3>Stock Holdings</h3>
      <table>
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
                <button onClick={() => onEditStock(stock)}>Edit</button>
                <button onClick={() => handleDelete(stock.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
