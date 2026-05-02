import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4338ca', // Deep Indigo
      light: '#6366f1',
      dark: '#312e81',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f43f5e', // Rose
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    success: {
      main: '#10b981',
      light: '#d1fae5',
    },
    info: {
      main: '#3b82f6',
      light: '#dbeafe',
    },
    warning: {
      main: '#f59e0b',
      light: '#fef3c7',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    button: {
      fontWeight: 600,
      fontFamily: '"Outfit", sans-serif',
    }
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid #f1f5f9',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            borderColor: '#e2e8f0'
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 24,
          padding: '8px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(67 56 202 / 0.2)',
          }
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontFamily: '"Outfit", sans-serif',
          borderRadius: 8,
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          color: '#0f172a',
          boxShadow: 'inset 0 -1px 0 0 #f1f5f9',
        }
      }
    }
  },
});

export default theme;
