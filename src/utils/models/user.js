const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  watchlist: {
    type: [String],
    default: ['SPY', 'QQQ', 'DIA', 'TSLA', 'AAPL', 'AMZN', 'WMT']
  }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);