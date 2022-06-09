import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("access_token");
	if (config.headers) config.headers.access_token = token ? token : "";
	return config;
});

export default api;
