import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('url', url);

      const response = await axios.post('https://2da5-86-33-79-161.ngrok-free.app/extract-yacht-data/', 
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.response?.data?.detail || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Yacht Data Extractor</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="urlInput" className="form-label">Enter Yacht Listing URL:</label>
          <input
            type="url"
            className="form-control"
            id="urlInput"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Extract Data</button>
      </form>
      <div className="mt-4">
        <h2>Result:</h2>
        {loading && (
          <div className="d-flex align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-2">Extracting data...</span>
          </div>
        )}
        <pre className="mt-3 p-3 bg-light">{result}</pre>
      </div>
    </div>
  );
}

export default App;