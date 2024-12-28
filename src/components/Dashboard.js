import React, { useState } from 'react';
import { searchStockWithAlpha } from './api'; // API function to search stock

const Dashboard = ({ stocks }) => {
  const [searchText, setSearchText] = useState(''); // Store search text
  const [searchResults, setSearchResults] = useState(null); // Store search results
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(''); // Store error message

  const totalValue = stocks.reduce((sum, stock) => sum + stock.quantity * stock.price, 0);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value); // Update search text when user types
  };

  const handleSearch = async () => {
    try {
      setError(''); // Reset error message
      setSearchResults(null); // Clear previous search results
      setLoading(true); // Start loading

      // Call API to fetch data
      const data = await searchStockWithAlpha(searchText);
      setSearchResults(data); // Store fetched data

    } catch (err) {
      setError('Failed to fetch data.');
      console.error(err);
    } finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Portfolio Tracker</h2>

      {/* Add Stock Section */}
      <div style={{ marginBottom: '20px' }}>
        <button>Add Stock</button>
      </div>

      {/* Stock Holdings Table */}
      <div>
        <h3>Stock Holdings</h3>
        <table border="1" style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.quantity}</td>
                <td>{stock.price}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Search Section */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange} // Update state as user types
          placeholder="Enter stock symbol (e.g., AAPL)"
          style={{ padding: '10px', width: '200px', marginRight: '10px' }}
        />
        <button onClick={handleSearch} style={{ padding: '10px' }} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {/* Error Message */}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      {/* Display Search Results */}
      {searchResults && (
        <div style={{ marginTop: '20px' }}>
          <h3>Search Results</h3>
          <div>
            {/* Display stock data if available */}
            {searchResults["Time Series (5min)"] ? (
              <div>
                <h4>Latest Stock Data for {searchText}</h4>
                <p>
                  <strong>Last Refreshed:</strong> 
                  {searchResults["Meta Data"]["3. Last Refreshed"]}
                </p>
                <p>
                  <strong>Latest Close Price:</strong> 
                  {searchResults["Time Series (5min)"][
                    Object.keys(searchResults["Time Series (5min)"])[0]
                  ]["4. close"]}
                </p>
              </div>
            ) : (
              <pre>{JSON.stringify(searchResults, null, 2)}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
