
// import axios from "axios";

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL || "https:localhost:5001/api",
//     timeout: 10000,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// Response Interceptor for Global Error Handling
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response) {
//             The request was made and the server responded with a status code
//             that falls out of the range of 2xx
//             console.error("API Error Response:", error.response.data);
//             if (error.response.status === 401) {
//                 Handle Unauthorized - e.g., redirect to login if session is expired
//                 console.warn("Unauthorized access - session may have expired");
//             }
//         } else if (error.request) {
//             The request was made but no response was received
//             console.error("API Request Error (No Response):", error.request);
//         } else {
//             Something happened in setting up the request that triggered an Error
//             console.error("API Setup Error:", error.message);
//         }
//         return Promise.reject(error);
//     }
// );

// export default api;

import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://localhost:5001/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor: attach a fresh Clerk token to every request.
// Clerk caches the token and refreshes it automatically, so no manual
// storage or interval is needed.
api.interceptors.request.use(async (config) => {
    const token = await window.Clerk?.session?.getToken({ template: "backend" });
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor for Global Error Handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (import.meta.env.DEV) {
                console.error("API Error Response:", error.response.data);
            }
            if (error.response.status === 401) {
                console.warn("Unauthorized access - session may have expired");
            }
        } else if (error.request) {
            console.error("API Request Error (No Response):", error.request);
        } else {
            console.error("API Setup Error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default api;