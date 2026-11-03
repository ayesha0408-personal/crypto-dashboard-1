
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getCryptoHistory } from "../services/cryptoApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

function CryptoChart({ selectedCrypto, darkMode })  {
  const [days, setDays] = useState("7");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedCrypto) return;

    const controller = new AbortController();

    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError("");
        setChartData([]);

        const data = await getCryptoHistory(
          selectedCrypto.id,
          days,
          controller.signal
        );

        const formattedData = data.prices.map(
          ([timestamp, price]) => ({
            date: new Date(timestamp).toLocaleString(
              "en-US",
              days === "1"
                ? {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  }
                : {
                    month: "short",
                    day: "numeric"
                  }
            ),
            timestamp,
            price
          })
        );

        setChartData(formattedData);

      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError("Unable to load price history. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchHistory();

    return () => controller.abort();

  }, [selectedCrypto, days]);

  const data = {
    labels: chartData.map((item) => item.date),

    datasets: [
      {
        label: `${selectedCrypto?.name} Price`,
        data: chartData.map((item) => item.price),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.10)",
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 5
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      intersect: false,
      mode: "index"
    },

    plugins: {
      legend: {
        display: false
      },

      tooltip: {
        backgroundColor: "#111827",
        padding: 12,

        callbacks: {
          label: (context) =>
            `Price: $${context.parsed.y.toLocaleString(
              "en-US",
              { maximumFractionDigits: 2 }
            )}`
        }
      }
    },

    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7,
          maxRotation: 0
        }
      },

      y: {
        grid: {
          color: "#e5e7eb"
        },
        ticks: {
          callback: (value) =>
            `$${Number(value).toLocaleString("en-US")}`
        }
      }
    }
  };

  if (!selectedCrypto) return null;

  return (
    <div className="chart-section">

      <div className="chart-header">
        <div>
          <h2>{selectedCrypto.name} Price History</h2>
          <p>Historical price movement in USD</p>
        </div>

        <div className="time-filters">
                  <button
                      className={`${days === "1" ? "active" : ""} ${darkMode ? "dark-button" : ""}`}
                      onClick={() => setDays("1")}
                  >
                      24 Hours
                  </button>

                  <button
                      className={`${days === "7" ? "active" : ""} ${darkMode ? "dark-button" : ""}`}
                      onClick={() => setDays("7")}
                  >
                      7 Days
                  </button>
        </div>
      </div>

      {loading && (
        <p className="chart-status">
          Loading price history...
        </p>
      )}

      {error && (
        <p className="chart-error">{error}</p>
      )}

      {!loading && !error && chartData.length > 0 && (
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
      )}

      {!loading && !error && chartData.length === 0 && (
        <p className="chart-status">
          No historical price data available.
        </p>
      )}

    </div>
  );
}

export default CryptoChart;
