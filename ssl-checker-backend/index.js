const express = require('express');
const axios = require('axios');
const forge = require('node-forge');

const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());

// Endpoint to check SSL certificate
app.get('/api/ssl-check', async (req, res) => {
    const domain = req.query.domain;
    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }
  
    try {
      const sslData = await fetchSSLCertificate(domain);
      res.json(sslData);  // Make sure response is JSON
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch SSL certificate' });
    }
  });
  

// Fetch and validate SSL certificate
const fetchSSLCertificate = async (domain) => {
  const url = `https://${domain}`;
  const response = await axios.get(url, { timeout: 5000 });
  const cert = response.request.connection.getPeerCertificate();

  // Extract SSL information
  return {
    isValid: cert.valid_to && new Date(cert.valid_to) > new Date(),
    expirationDate: cert.valid_to,
    issuer: cert.issuer ? cert.issuer.O : 'Unknown',
    subject: cert.subject ? cert.subject.CN : 'Unknown',
    caValid: validateCA(cert),
    selfSigned: cert.issuer.CN === cert.subject.CN,
    revoked: await checkRevocation(cert),
  };
};

// Validate if CA is trusted (example implementation, can be extended)
const validateCA = (cert) => {
  // Example: You can implement CA validation based on known root certificates
  return cert.issuer && cert.issuer.O !== '';
};

// Check revocation status (CRL/OCSP)
const checkRevocation = async (cert) => {
  // This is a mock implementation. Real implementation will involve contacting the CRL or OCSP server.
  return false; // Assume not revoked for simplicity
};

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
