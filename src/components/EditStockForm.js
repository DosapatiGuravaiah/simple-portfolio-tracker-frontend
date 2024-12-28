// src/components/EditStockForm.js
import React, { useState, useEffect } from 'react';

function EditStockForm({ stock, onUpdate, onCancel }) {
  const [name, setName] = useState(stock.name);
  const [quantity, setQuantity] = useState(stock.quantity);
  const [price, setPrice] = useState(stock.price);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(stock.id, { name, quantity, price });
  };

  return (
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
      <button type="submit">Update Stock</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditStockForm;
