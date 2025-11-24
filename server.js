const express = require('express');
const PipsCalculator = require('./src/pips'); // or './src/calculator' depending on your file

const app = express();
app.use(express.json()); // for JSON body parsing

const calc = new PipsCalculator();

// Example route: calculate pips
app.get('/pips', (req, res) => {
  const { entry, exit, pair } = req.query;
  if (!entry || !exit || !pair) {
    return res.status(400).json({ error: 'entry, exit and pair are required' });
  }
  try {
    const pips = calc.calculatePips(Number(entry), Number(exit), pair);
    res.json({ pair, pips });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
