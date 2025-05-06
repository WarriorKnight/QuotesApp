import { useState, useEffect } from 'react';
import axios from 'axios';
import './../App.css';

function Home() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        const response = await axios.get('/api/quote/random');
        setQuote(response.data.text);
        setAuthor(response.data.authorName);
      } catch (error) {
        console.error('Error fetching random quote:', error);
        setQuote('Failed to load quote.');
        setAuthor('');
      }
    };

    fetchRandomQuote();
  }, []);

  return (
    <div>
      <div className="card">
        <p className="quote">{quote}</p>
        <h6 className="author">{author}</h6>
      </div>
    </div>
  );
}

export default Home;