import axios from "axios";

const fromApi = axios.create({
  baseURL: "https://stock-backend-nlko.onrender.com/",
});

export const getPortfolioStocks = (uid) => {
  return fromApi
    .get(`/api/portfolio/${uid}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};
