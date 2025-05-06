import React, { useState } from 'react';
import axios from 'axios';

function AddQuote() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post('/api/quote', { text: quote });
      if (response.status === 201) {
        setMessage('Quote added successfully!');
        setQuote(''); // Clear the form
        setAuthor('');
      }
    } catch (error) {
      console.error('Error adding quote:', error);
      setMessage('Failed to add the quote. Please try again.');
    }
  };

  return (
    <div className="add-quote">
      <h1>Add a New Quote</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="quote">Quote:</label>
          <textarea
            id="quote"
            name="quote"
            rows={4}
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add Quote</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddQuote;