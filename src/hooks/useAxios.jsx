import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://medicine-store-seven.vercel.app`,
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;