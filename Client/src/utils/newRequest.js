import axios from "axios";
import { baseUrl } from "./config";

const newRequest = axios.create({
    baseURL: baseUrl,

});

export default newRequest;