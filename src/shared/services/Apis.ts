import axios from "axios";

const headerDefault = {
  "Content-Type": "application/json",
};

const apiQueue = axios.create({
  baseURL: "http://localhost:3009",
  timeout: 1000,
  headers: headerDefault,
});

const apiRankingConversion = axios.create({
  baseURL: "http://localhost:3333",
  timeout: 1000,
  headers: headerDefault,
});

export { apiQueue, apiRankingConversion };
