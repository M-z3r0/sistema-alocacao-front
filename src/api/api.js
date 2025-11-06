import axios from "axios";

const api = axios.create({
  baseURL: "https://sistemaalocacao-cjdhhnhwb7f7gedr.brazilsouth-01.azurewebsites.net/api"
});

export default api;