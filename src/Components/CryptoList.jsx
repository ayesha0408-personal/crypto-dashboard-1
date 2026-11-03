import CryptoCard from "./CryptoCard";

function CryptoList({ cryptos, onSelect, selectedCrypto }) {

  return (
    <div className="crypto-list">

      {cryptos.map((crypto) => (

        <CryptoCard
          key={crypto.id}
          crypto={crypto}
          onSelect={onSelect}
          isSelected={selectedCrypto?.id === crypto.id}
        />

      ))}

    </div>
  );
}

export default CryptoList;