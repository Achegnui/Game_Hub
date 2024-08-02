import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "4a25e63bdbbc4b41b581ae8c26ca0056",
  },
});