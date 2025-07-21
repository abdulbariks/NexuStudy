import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://nexustudy.vercel.app`,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
