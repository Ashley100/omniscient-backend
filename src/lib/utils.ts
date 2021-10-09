/**
 * Get price difference
 * @param leftPrice
 * @param rightPrice
 */
export const getPairDiff = (leftPrice:number, rightPrice:number): number => {
  return leftPrice >= rightPrice ? leftPrice - rightPrice : rightPrice - leftPrice;
};

/**
 * Get price difference in percent
 * @param leftPrice
 * @param rightPrice
 */
export const getPairDiffInPercent = (leftPrice:number, rightPrice:number): number => {
  const diff = (leftPrice >= rightPrice ? leftPrice - rightPrice : rightPrice - leftPrice);
  const sum = (leftPrice + rightPrice);
  const percent = ( diff / (sum / 2 )) * 100;
  return percent;
};

export const getPercentOfNumber = (number:number, percent:number): number => {
  return number * (percent / 100);
};

export const calculateBuySell = (price:number, amount:number): number => {
  return amount / price;
};
