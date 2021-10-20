// Package modules
import axios from 'axios';
import { HttpStatus } from '@nestjs/common';

// Local modules
import { ERRORS } from '../../../../../lib/config/errors';

const axiosInstance = axios.create({
  baseURL: 'https://api.binance.com/api/v3/'
});

export const binanceApi = {

  async getOrderBook(pair = 'BTCUSDT', limit) {
    const response = await axiosInstance.get(`depth?symbol=${pair}&limit=${limit}`);

    if (response.status !== HttpStatus.OK) {
      throw new Error(ERRORS.API_CALL_FAILED);
    }

    return response;
  },

  async getExchangeInfo(pair) {
    const response = await axiosInstance.get(`exchangeInfo?symbol=${pair}`);

    if (response.status !== HttpStatus.OK) {
      throw new Error(ERRORS.API_CALL_FAILED);
    }

    return response;
  },

  async getPairPrice(pair) {
    const response = await axiosInstance.get(`avgPrice?symbol=${pair}`);

    if (response.status !== HttpStatus.OK) {
      throw new Error(ERRORS.API_CALL_FAILED);
    }

    return response;
  }
};
