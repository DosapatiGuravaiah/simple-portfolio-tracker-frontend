import React, { useState, useEffect, useCallback } from 'react';
import { fetchStocks, addStock, updateStock, deleteStock, searchStockWithAlpha } from './api'; 
import './styles/App.css'; 

const App = () => {
  const [stocks, setStocks] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [searchResults, setSearchResults] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [newStock, setNewStock] = useState({ name: '', symbol: '', price: '', quantity: '' }); 
  const [editStock, setEditStock] = useState({ id: null, name: '', symbol: '', price: '', quantity: '' }); 

  const fetchAllStocks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const stocksData = await fetchStocks();
      setStocks(stocksData);
    } catch (err) {
      setError('Failed to load stocks');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAllStocks();
  }, [fetchAllStocks]);

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000); // Hide the success message after 5 seconds
  };

  const handleAddStock = async () => {
    if (!newStock.name || !newStock.symbol || !newStock.price || !newStock.quantity) return;
    setLoading(true);
    setError('');
    try {
      const addedStock = await addStock(newStock);
      setStocks((prevStocks) => [...prevStocks, addedStock]);
      setNewStock({ name: '', symbol: '', price: '', quantity: '' });
      showSuccessMessage('Stock added successfully!');
    } catch (err) {
      setError('Failed to add stock');
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchTerm) return; 
    setLoading(true);
    setError('');
    try {
      const data = await searchStockWithAlpha(searchTerm);
      setSearchResults(data); 
    } catch (err) {
      setError('Failed to fetch stock data');
    }
    setLoading(false);
  };

  const handleEditStock = (stock) => {
    setEditStock(stock);
  };

  const handleUpdateStock = async () => {
    if (!editStock.name || !editStock.symbol || !editStock.price || !editStock.quantity) return;
    setLoading(true);
    setError('');
    try {
      const updatedStock = await updateStock(editStock.id, editStock);
      setStocks(stocks.map(stock => (stock.id === editStock.id ? updatedStock : stock)));
      setEditStock({ id: null, name: '', symbol: '', price: '', quantity: '' });
      showSuccessMessage('Stock updated successfully!');
    } catch (err) {
      setError('Failed to update stock');
    }
    setLoading(false);
  };

  const handleDeleteStock = async (id) => {
    setLoading(true);
    setError('');
    try {
      await deleteStock(id);
      setStocks(stocks.filter(stock => stock.id !== id));
      showSuccessMessage('Stock deleted successfully!');
    } catch (err) {
      setError('Failed to delete stock');
    }
    setLoading(false);
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNewStockChange = (event) => {
    const { name, value } = event.target;
    setNewStock({ ...newStock, [name]: value });
  };

  const handleEditStockChange = (event) => {
    const { name, value } = event.target;
    setEditStock({ ...editStock, [name]: value });
  };

  return (
    <div className="container">
      <h1>Simple Portfolio Tracker</h1>
      <div className="search-container">
        <input type="text" value={searchTerm} onChange={handleSearchInput} placeholder="Search stock symbol" />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {successMessage && <div className="success">{successMessage}</div>} {/* Success Message */}

      <div className="form-container">
        <h3>Add Stock</h3>
        <form>
          <input type="text" name="name" value={newStock.name} onChange={handleNewStockChange} placeholder="Stock Name" />
          <input type="text" name="symbol" value={newStock.symbol} onChange={handleNewStockChange} placeholder="Stock Symbol" />
          <input type="number" name="price" value={newStock.price} onChange={handleNewStockChange} placeholder="Stock Price" />
          <input type="number" name="quantity" value={newStock.quantity} onChange={handleNewStockChange} placeholder="Stock Quantity" />
          <button type="button" onClick={handleAddStock}>Add Stock</button>
        </form>
      </div>

      {editStock.id && (
        <div>
          <h3>Edit Stock</h3>
          <form>
            <input type="text" name="name" value={editStock.name} onChange={handleEditStockChange} placeholder="Stock Name" />
            <input type="text" name="symbol" value={editStock.symbol} onChange={handleEditStockChange} placeholder="Stock Symbol" />
            <input type="number" name="price" value={editStock.price} onChange={handleEditStockChange} placeholder="Stock Price" />
            <input type="number" name="quantity" value={editStock.quantity} onChange={handleEditStockChange} placeholder="Stock Quantity" />
            <button type="button" onClick={handleUpdateStock}>Update Stock</button>
          </form>
        </div>
      )}

      <div className="stock-list">
        <h3>Stocks</h3>
        {stocks.length === 0 && !loading && <p className="no-stocks">No stocks available.</p>}
        <ul>
          {stocks.map((stock) => (
            <li key={stock.id}>
              <span>{stock.name} ({stock.symbol})</span>
              <span> Price: {stock.price}</span>
              <span> Quantity: {stock.quantity}</span>
              <span> Total Price: {stock.price * stock.quantity}</span>
              <button className="edit-btn" onClick={() => handleEditStock(stock)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteStock(stock.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {searchResults && (
        <div className="search-results">
          <h3>Search Results for {searchTerm}</h3>
          {searchResults['Time Series (5min)'] ? (
            <ul>
              {Object.keys(searchResults['Time Series (5min)']).map((time) => (
                <li key={time}>
                  Time: {time}, Open: {searchResults['Time Series (5min)'][time]['1. open']}, Close: {searchResults['Time Series (5min)'][time]['4. close']}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data found for this stock symbol.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
