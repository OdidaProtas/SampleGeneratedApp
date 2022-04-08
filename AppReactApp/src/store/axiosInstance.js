import axios from "axios";
// const endpoint = "http://localhost:7072";

const endpoint = "https://pro-gen-sample-api.herokuapp.com/"


const axiosInstance = axios.create({
    baseURL: endpoint
});

axiosInstance.interceptors.request.use(
    (config) => {
        const userToken = localStorage.getItem("access_token");
        if (userToken) {
            config.headers.common["access_token"] = (userToken);
        }
        return config;
    },
    (error) => {
        console.log(error);
    });

export { endpoint };
export default axiosInstance;