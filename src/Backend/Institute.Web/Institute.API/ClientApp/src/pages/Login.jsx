import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Container,
  Link,
  Grid,
  CssBaseline,
  CircularProgress,
  Alert,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import api from '../api/api'; // استيراد الـ api

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      // افتراضي إن الـ Backend بيرجع token
      const token = response.data.token;
      localStorage.setItem('authToken', token);

      // توجيه المستخدم للـ Dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError('خطأ في البريد أو كلمة المرور. حاول مرة أخرى.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={12} sx={{ padding: 6, borderRadius: 4, width: '100%', maxWidth: 480 }}>
          <Avatar sx={{ m: 'auto', bgcolor: 'primary.main', width: 80, height: 80, mb: 3 }}>
            <SchoolIcon sx={{ fontSize: 50 }} />
          </Avatar>

          <Typography component="h1" variant="h4" align="center" fontWeight="bold" color="primary.main" gutterBottom>
            ICEMT LMS
          </Typography>

          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
            المعهد التكنولوجي لهندسة التشييد والإدارة
          </Typography>

          <Typography variant="h5" align="center" sx={{ mb: 4 }}>
            تسجيل الدخول
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="البريد الإلكتروني"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="كلمة المرور"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 4, mb: 3, py: 1.8 }}
            >
              {loading ? <CircularProgress size={28} color="inherit" /> : 'تسجيل الدخول'}
            </Button>
          </Box>

          {/* باقي الروابط زي ما هي */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Link href="#" variant="body2">نسيت كلمة المرور؟</Link>
            </Grid>
            <Grid item xs={6}>
              <Link href="#" variant="body2" sx={{ float: 'right' }}>إنشاء حساب جديد</Link>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;