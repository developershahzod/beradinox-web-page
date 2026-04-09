import React from 'react';
import { Layout, AppBar } from 'react-admin';
import { Typography, Box } from '@mui/material';

const CustomAppBar = (props) => (
  <AppBar {...props}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
      <img 
        src="/logo.svg" 
        alt="Beradinox" 
        style={{ height: '40px', width: '40px', objectFit: 'contain' }}
      />
      <Typography variant="h6" color="inherit">
        Beradinox - Панель управления
      </Typography>
    </Box>
  </AppBar>
);

const CustomLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;

export default CustomLayout;
