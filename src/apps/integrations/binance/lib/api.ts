// Package modules
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.binance.com/api/v3/'
});

export const binanceApi = {

  async getOrderBook(pair = 'BTCUSDT', limit) {
    const response = await axiosInstance.get(`depth?symbol=${pair}&limit=${limit}`);

    return response;
  }
};
