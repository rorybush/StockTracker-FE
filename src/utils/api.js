import axios from "axios";

const fromApi = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

export const getPortfolioStocks = (uid) => {
  return fromApi.get(`/api/portfolio/${uid}`).then(({ data }) => {
    return data;
  });
};

export const postPortfolioStock = (uid, stockName, date, quantity, price) => {
  return fromApi.post(`/api/portfolio/${uid}/add`, {
    name: stockName,
    date: date,
    quantity: quantity,
    price: price,
  });
};

export const deletePortfolio = (uid) => {
  return fromApi.delete(`/api/portfolio/${uid}/deleteportfolio`);
};

export const getPortfolioProfitLoss = (uid) => {
  return fromApi.get(`/api/portfolio/${uid}/pl`).then(({ data }) => {
    return data;
  });
};

export const deleteStock = (uid, stock) => {
  return fromApi.delete(`/api/portfolio/${uid}/removestock`, {
    data: { stock: stock },
  });
};

export const editStock = (uid, stockName, date, quantity, price) => {
  return fromApi.patch(`/api/portfolio/${uid}/update`, {
    name: stockName,
    date: date,
    quantity: quantity,
    price: price,
  });
};

// Fetching list of stocks
export const getStockList = () => {
  return fromApi.get(`/api/stocklist`).then(({ data }) => {
    return data;
  });
};

// Fetching list of FTSE
export const getStockListNasdaq = () => {
  return fromApi.get(`/api/stocklist/nasdaq`).then(({ data }) => {
    return data;
  });
};

export const fetchStockData = (symbol) => {
  return fromApi.get(`/stock/${symbol}`).then(({ data }) => {
    return data.stock;
  });
};

// List of all news
export const getStockNews = () => {
  return fromApi.get("/api/news").then((response) => {
    return response.data;
  });
};

// List of specific news
export const getSingleStockNews = (symbol) => {
  return fromApi.get(`/api/news/${symbol}`).then((response) => {
    return response.data;
  });
};

export const getSingleStock = (stock) => {
  return fromApi.get(`/api/stockdata/${stock}`).then((response) => {
    return response.data;
  });
};

export const getTickerPrice = (tickers) => {
  const tickerArr = tickers.map((ticker) => {
    return `tickerArr=${ticker}`;
  });

  let endpoint = ``;
  endpoint += tickerArr[0];

  tickerArr.forEach((ticker, i) => {
    if (i < 1) return;
    return (endpoint += `&${ticker}`);
  });

  return fromApi.get(`/api/tickerinfo?${endpoint}`).then(({ data }) => {
    return data;
  });
};

export const getStockEvents = (ticker) => {
  return fromApi.get(`/api/calendar/${ticker}`).then(({ data }) => {
    return data;
  });
};

export const getStockAI = (stockname) => {
  return fromApi.get(`/api/stockai/${stockname}`).then(({ data }) => {
    return data;
  });
};
