import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h1>عذراً، حدث خطأ ما.</h1>
                    <p>يرجى محاولة إعادة تحميل الصفحة.</p>
                    <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-4 py-2 rounded">
                        إعادة تحميل
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
