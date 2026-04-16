import React, { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';

const LoginPage = () => {
  const login = useLogin();
  const notify = useNotify();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ username: email, password });
    } catch (err) {
      notify('Неверный email или пароль', { type: 'error' });
    }
    setLoading(false);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    }}>
      {/* Left side - branding */}
      <Box sx={{
        flex: 1,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.03 }}>
          {[...Array(20)].map((_, i) => (
            <Box key={i} sx={{
              position: 'absolute',
              width: 200 + i * 30,
              height: 200 + i * 30,
              borderRadius: '50%',
              border: '1px solid #fff',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
            }} />
          ))}
        </Box>
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 6 }}>
          <Box sx={{
            width: 72, height: 72, borderRadius: '18px',
            bgcolor: '#F4C430', display: 'flex', alignItems: 'center', justifyContent: 'center',
            mx: 'auto', mb: 3, boxShadow: '0 8px 32px rgba(244,196,48,0.3)',
          }}>
            <Typography sx={{ fontSize: 32, fontWeight: 900, color: '#111827' }}>B</Typography>
          </Box>
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#fff', mb: 1, letterSpacing: '-0.02em' }}>
            Beradinox
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#64748b', maxWidth: 280, lineHeight: 1.6 }}>
            Терминал металлопродукции №1<br />в Узбекистане и СНГ
          </Typography>
          <Box sx={{ mt: 5, display: 'flex', gap: 4, justifyContent: 'center' }}>
            {[
              { n: '100+', l: 'Продуктов' },
              { n: '127', l: 'Категорий' },
              { n: '24/7', l: 'Поддержка' },
            ].map((s) => (
              <Box key={s.l} sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: 20, fontWeight: 800, color: '#F4C430' }}>{s.n}</Typography>
                <Typography sx={{ fontSize: 11, color: '#64748b', mt: 0.3 }}>{s.l}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Right side - login form */}
      <Box sx={{
        width: { xs: '100%', md: 480 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#fff',
        borderRadius: { xs: 0, md: '24px 0 0 24px' },
        px: { xs: 3, sm: 6 },
      }}>
        <Box sx={{ width: '100%', maxWidth: 360 }}>
          {/* Mobile logo */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mb: 4 }}>
            <Box sx={{
              width: 56, height: 56, borderRadius: '14px',
              bgcolor: '#F4C430', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Typography sx={{ fontSize: 24, fontWeight: 900, color: '#111827' }}>B</Typography>
            </Box>
          </Box>

          <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', mb: 1 }}>
            Панель управления
          </Typography>
          <Typography sx={{ fontSize: 26, fontWeight: 800, color: '#111827', mb: 0.5 }}>
            Войти в аккаунт
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#9ca3af', mb: 4 }}>
            Введите данные администратора
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2.5 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#374151', mb: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Email
              </Typography>
              <TextField
                fullWidth size="small"
                placeholder="admin@beradinox.uz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required type="email"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px', fontSize: 14,
                    '& fieldset': { borderColor: '#e5e7eb' },
                    '&:hover fieldset': { borderColor: '#d1d5db' },
                    '&.Mui-focused fieldset': { borderColor: '#111827', borderWidth: 2 },
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#374151', mb: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Пароль
              </Typography>
              <TextField
                fullWidth size="small"
                placeholder="Введите пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px', fontSize: 14,
                    '& fieldset': { borderColor: '#e5e7eb' },
                    '&:hover fieldset': { borderColor: '#d1d5db' },
                    '&.Mui-focused fieldset': { borderColor: '#111827', borderWidth: 2 },
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                height: 48, borderRadius: '12px',
                bgcolor: '#111827', color: '#fff',
                fontSize: 14, fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                '&:hover': { bgcolor: '#1f2937', boxShadow: '0 6px 20px rgba(0,0,0,0.2)' },
                '&:disabled': { bgcolor: '#374151', color: '#9ca3af' },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Войти'}
            </Button>
          </form>

          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
            <Typography sx={{ fontSize: 11, color: '#d1d5db' }}>
              Beradinox Admin Panel v1.0
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
