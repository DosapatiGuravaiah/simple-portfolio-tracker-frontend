import React, { useState } from 'react';
import { addStock } from '../api';  // Import the addStock function

const AddStockForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('');  // State to store success or error messages
  const [showMessage, setShowMessage] = useState(false);  // State to control pop-up visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stock = { name, quantity, price };

    try {
      const addedStock = await addStock(stock);  // Call addStock function
      onAdd(addedStock);  // Update the stock list
      setName('');
      setQuantity(0);
      setPrice(0);
      setMessage('Stock added successfully! Please refresh the page.');  // Set success message
      setShowMessage(true);  // Show the pop-up
    } catch (error) {
      console.error('Error adding stock:', error);
      setMessage('Error adding stock. Please try again.');  // Set error message
      setShowMessage(true);  // Show the pop-up
    }
  };

  // Function to close the pop-up
  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Stock Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
        <button type="submit">Add Stock</button>
      </form>

      {/* Pop-up Message */}
      {showMessage && (
        <div style={popupStyles.container}>
          <div style={popupStyles.message}>
            <p>{message}</p>
            <button onClick={handleCloseMessage} style={popupStyles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Pop-up styles
const popupStyles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  message: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default AddStockForm;
