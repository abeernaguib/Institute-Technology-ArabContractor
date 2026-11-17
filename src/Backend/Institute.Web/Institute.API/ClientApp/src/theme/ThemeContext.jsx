// src/theme/ThemeContext.jsx
// One provider that does everything: remembers light/dark, sets data-theme on <html>
// (for theme.css) and gives MUI the matching theme + the RTL emotion cache.
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { getTheme, cacheRtl } from './theme';

const ThemeContext = createContext({ theme: 'light', toggle: () => { } });
const KEY = 'icemt-theme';

function getInitialTheme() {
    try {
        const saved = localStorage.getItem(KEY);
        if (saved === 'light' || saved === 'dark') return saved;
    } catch { /* ignore */ }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
    }, [theme]);

    const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
    const muiTheme = useMemo(() => getTheme(theme), [theme]);
    const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

    return (
        <ThemeContext.Provider value={value}>
            <CacheProvider value={cacheRtl}>
                <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
            </CacheProvider>
        </ThemeContext.Provider>
    );
}

export const useColorMode = () => useContext(ThemeContext);

export function ThemeToggle({ className = '' }) {
    const { theme, toggle } = useColorMode();
    const dark = theme === 'dark';
    return (
        <button
            onClick={toggle}
            className={className}
            aria-label={dark ? 'الوضع الفاتح' : 'الوضع الداكن'}
            title={dark ? 'الوضع الفاتح' : 'الوضع الداكن'}
            style={{
                background: 'var(--surface-2)', color: 'var(--text)',
                border: '1px solid var(--border)', borderRadius: 999,
                width: 34, height: 34, cursor: 'pointer', fontSize: 16,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, padding: 0,
            }}
        >
            {dark ? '☀️' : '🌙'}
        </button>
    );
}