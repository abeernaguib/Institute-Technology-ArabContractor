import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://icemt.arabcont.com/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Wait for Clerk to finish loading (requests fired on first render would
// otherwise go out without a token and return 401).
const waitForClerk = async (maxMs = 5000) => {
    const start = Date.now();
    while (!window.Clerk?.loaded && Date.now() - start < maxMs) {
        await new Promise((r) => setTimeout(r, 50));
    }
    return window.Clerk;
};

// Attach a fresh Clerk token to every request.
// Clerk caches and refreshes it automatically, so nothing is stored globally.
api.interceptors.request.use(async (config) => {
    try {
        const clerk = await waitForClerk();
        const token = await clerk?.session?.getToken({ template: "backend" });
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch {
        // continue without a token; the server will respond with 401 if required
    }
    return config;
});

// Response interceptor for global error handling
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