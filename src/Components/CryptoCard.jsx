function CryptoCard({ crypto, onSelect, isSelected }) {

  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <div
      className={`crypto-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(crypto)}
    >
      <div className="crypto-info">

        <img
          src={crypto.image}
          alt={crypto.name}
          className="crypto-image"
        />

        <div>
          <h3>{crypto.name}</h3>
          <p>{crypto.symbol.toUpperCase()}</p>
        </div>

      </div>

      <div className="crypto-price">
        <h3>
          ${crypto.current_price?.toLocaleString("en-US")}
        </h3>

        <span className={isPositive ? "positive" : "negative"}>
          {isPositive ? "+" : ""}
          {crypto.price_change_percentage_24h?.toFixed(2)}%
        </span>
      </div>

      <div className="market-cap">
        <p>Market Cap</p>
        <h4>
          ${crypto.market_cap?.toLocaleString("en-US")}
        </h4>
      </div>

    </div>
  );
}

export default CryptoCard;