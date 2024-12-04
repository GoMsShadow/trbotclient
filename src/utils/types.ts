export type TBParam = {
  symbol: string;
  volume: string;
  apiKey?: string;
  apiSecret?: string;
  expectedBuy?: number;
  stopLoss?: number;
  takeProfit?: number;
  active: boolean;
};

export type TBSymbol = {
  id: number;
  name: string;
};
