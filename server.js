const express = require('express');
const app = express();
app.use(express.json()); // per leggere JSON nel body

const PORT = process.env.PORT || 3000;

// La secret key che Wildix ti fornisce (devi sostituirla con la tua reale)
const SECRET_KEY = 'pnDGwY55i5QUv6jegyzqkmHueJFjxV';

// Per tenere traccia degli eventi già processati (in memoria, solo esempio)
const processedEvents = new Set();

app.post('/webhook', (req, res) => {
  // Leggi la secret dal header (cambia il nome header se necessario)
  const webhookSecret = req.headers['x-webhook-secret'];

  // Controlla la secret
  if (webhookSecret !== SECRET_KEY) {
    console.log('❌ Secret key non valida. Rifiuto webhook.');
    return res.status(403).json({ error: 'Forbidden' });
  }

  const payload = req.body;

  // Controlla se evento è già stato processato (evitiamo duplicati)
  if (processedEvents.has(payload.id)) {
    console.log(`⚠️ Evento ${payload.id} già processato, salto.`);
    return res.sendStatus(200);
  }

  // Segna evento come processato
  processedEvents.add(payload.id);

  // Log per debug
  console.log('✅ Webhook valido ricevuto:', JSON.stringify(payload, null, 2));

  // Qui inserisci il tuo codice per elaborare i dati...

  // Risposta veloce a Wildix
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server webhook attivo sulla porta ${PORT}`);
});
