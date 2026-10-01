// import { useEffect, useRef } from "react";
// import { useAuth } from "@clerk/clerk-react";

// export default function AuthSync() {
//     const { isSignedIn, getToken } = useAuth();
//     const syncedRef = useRef(false);
//     const intervalRef = useRef(null);

//     useEffect(() => {
//         if (!isSignedIn) return;

//         const fetchAndStore = async () => {
//             const token = await getToken({ template: "backend" });
//             if (token) {
//                 window.__clerkToken = token; available to all apiFetch calls

//                 Dev only: wipe the console and show just the latest token.
//                 Never runs in the production build.
//                 if (import.meta.env.DEV) {
//                     console.clear();
//                     console.log("CLERK TOKEN (latest):", token);
//                 }
//             }
//         };

//         const sync = async () => {
//             await fetchAndStore();

//             Only call /api/Account/sync once per session
//             if (!syncedRef.current) {
//                 syncedRef.current = true;
//                 await fetch("https:icemt.arabcont.com/api/Account/sync", {
//                     method: "POST",
//                     headers: {
//                         Authorization: `Bearer ${window.__clerkToken}`,
//                     },
//                 });
//             }
//         };

//         sync();

//         Refresh every 50 seconds (Clerk tokens are valid for ~60 seconds)
//         intervalRef.current = setInterval(fetchAndStore, 50_000);

//         return () => clearInterval(intervalRef.current);
//     }, [isSignedIn]);

//     return null;
// }
import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_API_URL || "https://icemt.arabcont.com/api";

export default function AuthSync() {
    const { isSignedIn, getToken } = useAuth();
    const syncedRef = useRef(false);

    useEffect(() => {
        if (!isSignedIn || syncedRef.current) return;
        syncedRef.current = true;

        (async () => {
            try {
                const token = await getToken({ template: "backend" });
                if (!token) {
                    syncedRef.current = false;
                    return;
                }

                const res = await fetch(`${API_URL}/Account/sync`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) syncedRef.current = false; // retry later if the server rejected it
            } catch {
                syncedRef.current = false; // retry if the request failed
            }
        })();
    }, [isSignedIn, getToken]);

    return null;
}