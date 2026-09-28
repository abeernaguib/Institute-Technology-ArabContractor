import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function AuthSync() {
    const { isSignedIn, getToken } = useAuth();
    const syncedRef = useRef(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!isSignedIn) return;

        const fetchAndStore = async () => {
            const token = await getToken({ template: "backend" });
            if (token) {
                window.__clerkToken = token; // available to all apiFetch calls

                // Dev only: wipe the console and show just the latest token.
                // Never runs in the production build.
                if (import.meta.env.DEV) {
                    console.clear();
                    console.log("CLERK TOKEN (latest):", token);
                }
            }
        };

        const sync = async () => {
            await fetchAndStore();

            // Only call /api/Account/sync once per session
            if (!syncedRef.current) {
                syncedRef.current = true;
                await fetch("https://icemt.arabcont.com/api/Account/sync", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${window.__clerkToken}`,
                    },
                });
            }
        };

        sync();

        // Refresh every 50 seconds (Clerk tokens are valid for ~60 seconds)
        intervalRef.current = setInterval(fetchAndStore, 50_000);

        return () => clearInterval(intervalRef.current);
    }, [isSignedIn]);

    return null;
}