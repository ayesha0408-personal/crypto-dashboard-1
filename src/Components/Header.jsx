
import { Coins, Sun, Moon } from "lucide-react";

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <div className="logo">
        <Coins size={28} />
        <h2>CryptoTrack</h2>
      </div>

      <div className="header-actions">
        <p>Cryptocurrency Market Dashboard</p>

        <button
          className="theme-toggle"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
