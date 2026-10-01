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
import api from "./api"; // adjust the path to wherever your axios file lives

export default function AuthSync() {
    const { isSignedIn } = useAuth();
    const syncedRef = useRef(false);

    useEffect(() => {
        if (!isSignedIn || syncedRef.current) return;
        syncedRef.current = true;

        // Only call /Account/sync once per session.
        // The api interceptor attaches the Clerk token automatically.
        api.post("/Account/sync").catch(() => {
            syncedRef.current = false; // allow a retry if the sync failed
        });
    }, [isSignedIn]);

    return null;
}