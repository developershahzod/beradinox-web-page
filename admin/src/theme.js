import { defaultTheme } from 'react-admin';
import { deepmerge } from '@mui/utils';

const theme = deepmerge(defaultTheme, {
  palette: {
    primary: {
      main: '#111827',
      light: '#374151',
      dark: '#030712',
    },
    secondary: {
      main: '#F4C430',
      light: '#f7d560',
      dark: '#d4a820',
    },
    background: {
      default: '#f9fafb',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    h6: { fontWeight: 700, fontSize: '1rem' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#111827',
          boxShadow: 'none',
          borderBottom: '1px solid #1f2937',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none', fontWeight: 600 },
        containedPrimary: { backgroundColor: '#111827', '&:hover': { backgroundColor: '#1f2937' } },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6b7280' },
        body: { fontSize: '0.875rem' },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: { '&:hover': { backgroundColor: '#f9fafb !important' } },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 600 },
      },
    },
    RaDatagrid: {
      styleOverrides: {
        root: { '& .RaDatagrid-headerCell': { backgroundColor: '#f9fafb' } },
      },
    },
  },
});

export default theme;
