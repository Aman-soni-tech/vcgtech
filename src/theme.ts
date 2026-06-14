import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9DBBFF', // Electric blue
      light: '#D2E2FF',
      dark: '#4A6FA5',
      contrastText: '#020B1A',
    },
    secondary: {
      main: '#FFE066', // Golden yellow
      light: '#FFF0B3',
      dark: '#B39500',
      contrastText: '#020B1A',
    },
    background: {
      default: '#020B1A', // Base deepest navy
      paper: '#071527',   // Lighter navy card overlay
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#DCE7FF', // Soft ice-blue-white text
    },
    divider: 'rgba(160, 190, 255, 0.15)',
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    subtitle2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      lineHeight: 1.5,
    },
    button: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#020B1A',
          color: '#FFFFFF',
          scrollbarWidth: 'thin',
          scrollbarColor: '#4A6FA5 #020B1A',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#020B1A',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#4A6FA5',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#9DBBFF',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          padding: '10px 24px',
          fontWeight: 600,
          transition: 'all 0.3s ease-in-out',
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(135deg, #9DBBFF 0%, #688FFF 100%)',
            boxShadow: '0 4px 15px rgba(157, 187, 255, 0.3)',
            color: '#020B1A',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(157, 187, 255, 0.5)',
              background: 'linear-gradient(135deg, #AEC7FF 0%, #7CA0FF 100%)',
            },
          },
          '&.MuiButton-containedSecondary': {
            background: 'linear-gradient(135deg, #FFE066 0%, #FFD84D 100%)',
            boxShadow: '0 4px 15px rgba(255, 224, 102, 0.25)',
            color: '#020B1A',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(255, 224, 102, 0.45)',
              background: 'linear-gradient(135deg, #FFF0B3 0%, #FFE066 100%)',
            },
          },
          '&.MuiButton-outlinedPrimary': {
            borderColor: 'rgba(157, 187, 255, 0.4)',
            color: '#9DBBFF',
            borderWidth: '1.5px',
            '&:hover': {
              borderWidth: '1.5px',
              borderColor: '#9DBBFF',
              backgroundColor: 'rgba(157, 187, 255, 0.08)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(160, 190, 255, 0.12)',
          borderRadius: '16px',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          boxShadow: '0 8px 32px 0 rgba(2, 11, 26, 0.37)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            transition: 'all 0.2s',
            '& fieldset': {
              borderColor: 'rgba(160, 190, 255, 0.15)',
              transition: 'border-color 0.2s',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(160, 190, 255, 0.3)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9DBBFF',
              boxShadow: '0 0 8px rgba(157, 187, 255, 0.3)',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '12px',
        },
      },
    },
  },
});

export default theme;
