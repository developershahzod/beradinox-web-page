import React from 'react';
import { Layout, AppBar } from 'react-admin';
import { Typography, Box } from '@mui/material';

const CustomAppBar = (props) => (
  <AppBar {...props} sx={{ backgroundColor: '#111827', boxShadow: 'none', borderBottom: '1px solid #1f2937' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
      <Box sx={{ width: 32, height: 32, borderRadius: '8px', bgcolor: '#F4C430', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ fontSize: 14, fontWeight: 900, color: '#111827' }}>B</Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
          Beradinox
        </Typography>
        <Typography sx={{ fontSize: 10, color: '#6b7280', lineHeight: 1 }}>
          Admin Panel
        </Typography>
      </Box>
    </Box>
  </AppBar>
);

const CustomLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;

export default CustomLayout;
