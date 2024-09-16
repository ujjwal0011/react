import React, { useState } from 'react';

function App() {
  const [domain, setDomain] = useState('');
  const [sslData, setSslData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSslData(null);
    try {
      // Use full URL with backend port
      const response = await fetch(`http://localhost:3001/api/ssl-check?domain=${domain}`);
      if (!response.ok) {
        throw new Error('Domain is invalid or SSL certificate cannot be fetched');
      }
      const data = await response.json();
      setSslData(data);
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="App">
      <h1>SSL Certificate Checker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter domain name"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <button type="submit">Check SSL</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {sslData && (
        <div>
          <h2>SSL Information for {domain}</h2>
          <p>Validity Status: {sslData.isValid ? 'Valid' : 'Invalid'}</p>
          <p>Expiration Date: {sslData.expirationDate}</p>
          <p>Issuer: {sslData.issuer}</p>
          <p>Subject: {sslData.subject}</p>
          <p>CA is valid: {sslData.caValid ? 'Yes' : 'No'}</p>
          <p>Not self-signed: {sslData.selfSigned ? 'No' : 'Yes'}</p>
          <p>CRL/OCSP Status: {sslData.revoked ? 'Revoked' : 'Not revoked'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
