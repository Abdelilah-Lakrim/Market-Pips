const PipsCalculator = require('./src/pips.js');
const calc = new PipsCalculator();

console.log('EURUSD pips (1.1000 -> 1.1050):', calc.calculatePips(1.1000, 1.1050, 'EURUSD'));
console.log('XAUUSD profit:', calc.calculateProfit(2000, 2005, 'XAUUSD', 0.1));
