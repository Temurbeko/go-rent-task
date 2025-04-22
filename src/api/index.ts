import axios from "axios";

const BASE_URL = "https://api.github.com/search/repositories?q=stars:>1";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.github.v3+json",
  },
});
const token = process.env.GITHUB_TOKEN;

if (token) {
  apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
}
console.log("😀😀😀token: ", token);

export default apiClient;
