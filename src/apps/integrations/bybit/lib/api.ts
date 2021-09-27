import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.bybit.com/v2/'
});
export const bybitApi = {

  async getOrderBook(pair = 'BTCUSDT', limit) {
    const response = await axiosInstance.get(`public/orderBook/L2?symbol=${pair}`);

    return response;
  }
};
