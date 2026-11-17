import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ClerkProvider } from '@clerk/clerk-react';
import theme, { cacheRtl } from './theme/theme.js';
import './index.css';
import './i18n/index.js';
import App from './App.jsx';
import ErrorBoundary from './pages/ErrorBoundary.jsx';

// Test key, used ONLY on localhost (the build's prerender step and local development),
// where there is no Azure backend to ask.
const LOCAL_FALLBACK_KEY = 'pk_test_bWlnaHR5LWJhc2lsaXNrLTExLmNsZXJrLmFjY291bnRzLmRldiQ';

const IS_LOCALHOST = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);

// Reveal the page only after React has painted with its styles.
function revealApp() {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (window.__revealApp) {
                window.__revealApp();
            } else {
                document.documentElement.classList.remove('js-loading');
            }
        });
    });
}

// Small component that triggers the reveal once it has mounted (i.e. after first render).
function RevealOnMount({ children }) {
    React.useEffect(() => {
        // Wait for the font too, but never longer than 1.5s.
        const fontReady = document.fonts && document.fonts.ready
            ? Promise.race([
                document.fonts.ready,
                new Promise((resolve) => setTimeout(resolve, 1500)),
            ])
            : Promise.resolve();

        fontReady.then(revealApp);
    }, []);

    return children;
}

// Asks the backend for the key stored in Azure App Settings (Clerk__PublishableKey).
async function fetchKeyFromBackend() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
        const res = await fetch('/api/config', { cache: 'no-store', signal: controller.signal });
        if (!res.ok) throw new Error('Config request failed: ' + res.status);
        const data = await res.json();
        if (!data.clerkPublishableKey) throw new Error('No key in config response');
        return data.clerkPublishableKey;
    } finally {
        clearTimeout(timer);
    }
}

async function loadPublishableKey() {
    try {
        return await fetchKeyFromBackend();
    } catch (err) {
        // On localhost (build prerender / local dev) there is no Azure backend, so use the test key.
        if (IS_LOCALHOST) {
            console.warn('Using local fallback Clerk key:', err);
            return LOCAL_FALLBACK_KEY;
        }
        // On the real sites never guess: a wrong key would silently break login.
        throw err;
    }
}

async function start() {
    const PUBLISHABLE_KEY = await loadPublishableKey();

    const container = document.getElementById('root');
    // Remove any prerendered markup (it has no Emotion CSS) so React renders the styled version.
    container.innerHTML = '';

    ReactDOM.createRoot(container).render(
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <BrowserRouter>
                        <div dir="rtl">
                            <ErrorBoundary>
                                <RevealOnMount>
                                    <App />
                                </RevealOnMount>
                            </ErrorBoundary>
                        </div>
                    </BrowserRouter>
                </ThemeProvider>
            </CacheProvider>
        </ClerkProvider>
    );
}

start().catch((err) => {
    console.error(err);
    // Prerendered markup stays visible if the config can't be loaded
    document.documentElement.classList.remove('js-loading');
});