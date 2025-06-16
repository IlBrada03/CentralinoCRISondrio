require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Croce Rossa Sondrio Centralino API ONLINE');
});

app.post('/webhook', (req, res) => {
  console.log('📞 Richiesta ricevuta dal centralino Wildix:');
  console.log(req.body);

  res.json({ status: 'ok', message: 'Webhook ricevuto' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server online su porta ${PORT}`);
});
