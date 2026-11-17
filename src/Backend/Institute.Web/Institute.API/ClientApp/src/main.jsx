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

const PUBLISHABLE_KEY = 'pk_live_Y2xlcmsuYXJhYmNvbnQuY29tJA';

if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file');
}

const container = document.getElementById('root');

// Remove any prerendered markup (it has no Emotion CSS) so React renders the styled version.
container.innerHTML = '';

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