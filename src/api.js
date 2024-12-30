// src/api.js
const API_BASE = 'portfoliobackend.railway.internal/api/stocks';

// Fetch all stocks
export const fetchStocks = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error('Failed to fetch stocks');
  }
  return response.json();
};

// Add a new stock
export const addStock = async (stock) => {
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stock),
    });

    if (!response.ok) {
      const errorDetails = await response.text();  // Get error details
      console.error('Error response:', errorDetails);  // Log the error response
      throw new Error('Failed to add stock');
    }

    return response.json();
  } catch (error) {
    console.error('Error occurred:', error);  // Log any error that occurs
    throw error;
  }
};

// Update an existing stock
export const updateStock = async (id, stock) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stock),
  });

  if (!response.ok) {
    throw new Error('Failed to update stock');
  }

  return response.json();
};

// Delete a stock
export const deleteStock = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete stock');
  }
};



// src/api.js
export async function searchStockWithAlpha(text) {
  try {
    console.log('Searching for:', text);
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${text}&interval=5min&apikey=34GJNDAD5KW61021`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }

    const response_json = await response.json();
    console.log(response_json);

    // Return the fetched data so it can be displayed in the UI
    return response_json;
  } catch (err) {
    console.log('Caught error in searchStockWithAlpha service method:');
    console.error(err);
    throw err; // Rethrow error to handle it in the caller function
  }
}



// https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TCSG&interval=5min&apikey=demo
