import axios from "axios";

const fromApi = axios.create({
  baseURL: "https://stock-backend-nlko.onrender.com",
});

export const getPortfolioStocks = (uid) => {
  return fromApi
    .get(`/api/portfolio/${uid}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
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
  return fromApi.get('/api/news')
  .then((response) => {
    return response.data
  })
}

export const getSingleStock = (stock) => {
  return fromApi.get(`/api/stockdata/${stock}`).then((response) => {
    console.log(response);
    return response.data
  })
}