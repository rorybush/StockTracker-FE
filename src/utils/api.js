import axios from "axios";

const fromApi = axios.create({
  baseURL: "https://backend-stock.onrender.com",
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

export const deleteStock = (uid, stock) => {
  return fromApi.delete(`/api/portfolio/${uid}/removestock`, {
    data: { stock: stock },
  });
};

export const editStock = (uid) => {
  return fromApi.patch(`/api/portfolio/${uid}/update`, {
    // data: { stock: stock },
  });
};

// Fetching list of stocks
export const getStockList = () => {
  return fromApi.get(`/api/stocklist`).then(({ data }) => {
    return data;
  });
};

// Fetching list of FTSE
export const getStockListFtse = () => {
  return fromApi.get(`/api/stocklist/ftse`).then(({ data }) => {
    return data;
  });
};

export const fetchStockData = () => {
  return fromApi.get(`/stock`).then(({ data }) => {
    return data.stock;
  });
};

// export const signUp = () => {
//   return formApi
//   .post('/sign-up', {

//   })
//   .then((response) => {
//     console.log(response, "API")
//   })
// }

export const getStockNews = () => {
  return fromApi.get("/api/news").then((response) => {
    return response.data;
  });
};

export const getSingleStock = (stock) => {
  return fromApi.get(`/api/stockdata/${stock}`).then((response) => {
    console.log(response);
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
