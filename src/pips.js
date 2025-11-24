const DEFAULT_INSTRUMENTS = {
  "EURUSD": { pipSize: 0.0001, contractSize: 100000 },
  "GBPUSD": { pipSize: 0.0001, contractSize: 100000 },
  "USDJPY": { pipSize: 0.01, contractSize: 100000 },
  "XAUUSD": { pipSize: 0.01, contractSize: 100 },
  "XAGUSD": { pipSize: 0.01, contractSize: 5000 },
  "BTCUSD": { pipSize: 1, contractSize: 1 },
  "ETHUSD": { pipSize: 0.1, contractSize: 1 },
  "US30": { pipSize: 1, contractSize: 1 },
  "NAS100": { pipSize: 0.1, contractSize: 1 }
};

class PipsCalculator {
  constructor(customInstruments = {}) {
    this.instruments = { ...DEFAULT_INSTRUMENTS, ...customInstruments };
  }

  getInstrument(pair) {
    if (!this.instruments[pair]) {
      throw new Error(`Instrument "${pair}" not found. Provide a custom definition if needed.`);
    }
    return this.instruments[pair];
  }

  calculatePips(entry, exit, pair) {
    const { pipSize } = this.getInstrument(pair);
    return (exit - entry) / pipSize;
  }

  calculatePipValue(pair, lot = 1) {
    const { pipSize, contractSize } = this.getInstrument(pair);
    return (pipSize * contractSize) * lot;
  }

  calculateProfit(entry, exit, pair, lot = 1) {
    const pips = this.calculatePips(entry, exit, pair);
    const pipValue = this.calculatePipValue(pair, lot);
    return pips * pipValue;
  }

  calculateRisk(entry, stopLoss, pair, lot = 1) {
    return Math.abs(this.calculateProfit(entry, stopLoss, pair, lot));
  }

  calculateReward(entry, takeProfit, pair, lot = 1) {
    return Math.abs(this.calculateProfit(entry, takeProfit, pair, lot));
  }

  calculateRR(entry, stopLoss, takeProfit, pair, lot = 1) {
    const risk = this.calculateRisk(entry, stopLoss, pair, lot);
    const reward = this.calculateReward(entry, takeProfit, pair, lot);
    return risk === 0 ? Infinity : reward / risk;
  }
}

module.exports = PipsCalculator;
