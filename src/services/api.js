const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchTopCoins = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch coins:", error);
    throw error;
  }
};

// Add this below your existing fetchTopCoins function

export const fetchCoinDetails = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch coin details:", error);
    throw error;
  }
};

// Add this below your existing functions

export const fetchCoinHistory = async (id, days = 7) => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.prices; // This returns an array of [timestamp, price] pairs
  } catch (error) {
    console.error("Failed to fetch historical data:", error);
    throw error;
  }
};