import { useEffect, useState } from 'react';
import { Box, Zoom } from '@mui/material';

const ScrollToTopButton = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Detects scroll position across all browser types
            const scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;

            setShow(scrollTop > 300);
        };

        // 'true' helps capture events in nested scrolling divs
        window.addEventListener('scroll', handleScroll, true);
        return () => window.removeEventListener('scroll', handleScroll, true);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Zoom in={show}>
            <Box
                onClick={scrollToTop}
                role="presentation"
                sx={{
                    position: 'fixed',
                    bottom: { xs: 20, md: 40 },
                    right: { xs: 20, md: 40 },
                    zIndex: 99999, // Ensure it is above everything
                }}
            >
                <Box
                    sx={{
                        width: { xs: 50, md: 60 },
                        height: { xs: 50, md: 60 },
                        borderRadius: '50%',
                        // Transparent Orange: 0.5 is 50% transparency
                        backgroundColor: 'rgba(245, 124, 0, 0.5)',
                        color: '#fff',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // Glass effect
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '0.5px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            backgroundColor: 'rgba(245, 124, 0, 0.8)', // Becomes more solid on hover
                            transform: 'scale(1.1) translateY(-5px)',
                        },
                    }}
                >
                    ↑
                </Box>
            </Box>
        </Zoom>
    );
};

export default ScrollToTopButton;