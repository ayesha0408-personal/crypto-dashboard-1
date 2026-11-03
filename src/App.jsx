
import { useState, useEffect, useRef } from "react";

import { getCryptoList } from "./services/cryptoApi";

import Header from "./Components/Header";
import CryptoList from "./Components/CryptoList";
import SearchBar from "./Components/SearchBar";
import CryptoChart from "./Components/CryptoChart";

import "./App.css";

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  
  const [countdown, setCountdown] = useState(30);
  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
  });

  const chartRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  
  useEffect(() => {
    let activeController = null;

    const fetchCryptos = async (initialLoad = false) => {
      // Cancel any previous request
      activeController?.abort();

      const controller = new AbortController();
      activeController = controller;

      try {
        if (initialLoad) {
          setLoading(true);
        }

        setError("");

        const data = await getCryptoList(controller.signal);
        console.log("Prices refreshed at:", new Date().toLocaleTimeString());
        console.log("Updated Bitcoin price:", data[0]?.current_price);    
        setCryptos(data);

      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError("Unable to refresh cryptocurrency data.");
        }
      } finally {
        if (initialLoad && !controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    
    fetchCryptos(true);

    // Countdown and auto-refresh
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchCryptos();
          return 30;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      activeController?.abort();
    };
  }, []);

  
  useEffect(() => {
    if (selectedCrypto) {
      chartRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedCrypto]);

  // Search functionality
  const filteredCryptos = cryptos.filter((crypto) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      crypto.name.toLowerCase().includes(search) ||
      crypto.symbol.toLowerCase().includes(search)
    );
  });

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="dashboard">
        <div className="section-heading">
          <h1>Market Overview</h1>
          <p>Track the latest cryptocurrency market prices.</p>

          <p className="refresh-timer">
            <span className="refresh-dot"></span>
            Next refresh in <strong>{countdown}s</strong>
          </p>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {loading && <p className="status">Loading...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && cryptos.length > 0 && (
          <CryptoList
            cryptos={filteredCryptos}
            onSelect={setSelectedCrypto}
            selectedCrypto={selectedCrypto}
          />
        )}

        {!loading && !error && filteredCryptos.length === 0 && (
          <p className="no-results">
            No cryptocurrencies found.
          </p>
        )}

        {selectedCrypto && (
          <div ref={chartRef} className="chart-scroll-target">
            <CryptoChart
              selectedCrypto={selectedCrypto}
              darkMode={darkMode}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
