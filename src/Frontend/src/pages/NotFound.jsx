import { Link } from 'react-router-dom';

const NotFound = () => (
    <div dir="rtl" style={{
        minHeight: '70vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16, fontFamily: '"Noto Kufi Arabic", serif'
    }}>
        <h1 style={{ fontSize: 64, margin: 0, color: '#0865a8' }}>404</h1>
        <p style={{ fontSize: 20 }}>الصفحة غير موجودة</p>
        <Link to="/" style={{
            padding: '12px 28px', borderRadius: 10, color: '#fff', textDecoration: 'none',
            fontWeight: 'bold', background: 'linear-gradient(135deg,#0865a8,#f57c00)'
        }}>
            العودة للصفحة الرئيسية
        </Link>
    </div>
);

export default NotFound;