// Package modules
import axios from 'axios';
import { HttpStatus } from '@nestjs/common';

// Local modules
import { ERRORS } from '../../../../../lib/config/errors';

const axiosInstance = axios.create({
  baseURL: 'https://api.bybit.com/v2/'
});

const axiosPublicInstance = axios.create({
  baseURL: 'https://api.bybit.com/'
});

export const bybitApi = {

  async getOrderBook(pair = 'BTCUSDT', limit) {
    const response = await axiosInstance.get(`public/orderBook/L2?symbol=${pair}`);

    if (response.status !== HttpStatus.OK) {
      throw new Error(ERRORS.API_CALL_FAILED);
    }

    return response;
  },

  async getPairPrice(pair, internal = 1, limit = 1, from = 1581231260) {
    const response = await axiosPublicInstance.get(`/spot/quote/v1/ticker/price?symbol=${pair}`);

    if (response.status !== HttpStatus.OK) {
      throw new Error(ERRORS.API_CALL_FAILED);
    }

    return response;
  }
};
