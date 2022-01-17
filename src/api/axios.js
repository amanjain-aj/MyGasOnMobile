import axios from "axios";
import urlConfig from "./config.json"

const instance = axios.create({
    baseURL:urlConfig.baseURL
})




export default instance;

