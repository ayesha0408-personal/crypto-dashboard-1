import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";


export const getCryptoList = async (signal) => {
  const response = await axios.get(
    `${BASE_URL}/coins/markets`,
    {
      params: {
        vs_currency: "usd",
        ids: "bitcoin,ethereum,cardano,solana,polkadot",
        price_change_percentage: "24h"
      },
      signal
    }
  );

  return response.data;
};
export const getCryptoHistory = async (coinId, days, signal) => {
  const response = await axios.get(
    `${BASE_URL}/coins/${coinId}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days: days
      },
      signal
    }
  );

  return response.data;
};