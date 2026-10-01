import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_API_URL || "https://icemt.arabcont.com/api";

export default function AuthSync() {
    const { isSignedIn, getToken } = useAuth();
    const syncedRef = useRef(false);

    useEffect(() => {
        if (!isSignedIn || syncedRef.current) return;
        syncedRef.current = true;

        // Call /Account/sync once per session
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

                if (!res.ok) syncedRef.current = false; // retry later if rejected
            } catch {
                syncedRef.current = false; // retry if the request failed
            }
        })();
    }, [isSignedIn, getToken]);

    return null;
}