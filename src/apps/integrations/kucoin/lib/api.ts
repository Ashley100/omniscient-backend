// Package modules
import axios from 'axios';
import { HttpStatus } from '@nestjs/common';

// Local modules
import { ERRORS } from '../../../../lib/config/errors';

const axiosInstance = axios.create({
  baseURL: 'https://api.kucoin.com/api/v1/'
});

export const kucoinApi = {

  async getOrderBook(pair = 'BTC-USDT', limit) {
    const response = await axiosInstance.get(`market/orderbook/level2_20?symbol=${pair}`);

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
