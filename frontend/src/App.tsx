import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddQuote from './pages/AddQuote'; // Import the new page component
import Home from './pages/Home'; // Optional: Move the current content to a Home component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/add" element={<AddQuote />} />
      </Routes>
    </Router>
  );
}

export default App;