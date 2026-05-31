import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://cb3l2gkmc3jyuxvcekoj5im4zq0ssysz.lambda-url.ap-south-1.on.aws/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
