
# CryptoTrack – Cryptocurrency Dashboard

A responsive cryptocurrency dashboard built using React.js that displays real-time market information and historical price trends using the CoinGecko API.

## Features

- Displays cryptocurrency prices, market capitalization and 24-hour price changes.
- Supports searching cryptocurrencies by name or symbol.
- Interactive historical price charts using Chart.js.
- View price history for 24 hours and 7 days.
- Automatic market data refresh every 30 seconds.
- Countdown timer showing the next refresh.
- Dark and light mode with saved theme preference.
- Responsive user interface.
- Loading and error handling.

## Tech Stack

- React.js
- JavaScript
- Vite
- Axios
- Chart.js
- React Chart.js 2
- Lucide React
- CSS
- CoinGecko API

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project folder:

   ```bash
   cd crypto-dashboard
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

## API Integration

This project uses the CoinGecko API to retrieve cryptocurrency market data and historical prices.

API endpoints:
- `/coins/markets` – Cryptocurrency market information.
- `/coins/{id}/market_chart` – Historical cryptocurrency prices.

## Project Structure

```text
src/
├── Components/
│   ├── Header.jsx
│   ├── CryptoCard.jsx
│   ├── CryptoList.jsx
│   ├── SearchBar.jsx
│   └── CryptoChart.jsx
├── services/
│   └── cryptoApi.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Author

Developed as a React.js internship assignment.
