import React from 'react';
import logo from './logo.svg';
import './App.css';
import { JsonPreview } from './JsonPreview';
import { listItemClasses, PaletteOptions, paperClasses, StyledEngineProvider, ThemeOptions, ThemeProvider, tooltipClasses } from '@mui/material';
import { grey } from '@mui/material/colors';

export const paletteDark: PaletteOptions = {
  mode: 'dark',
  background: {
    paper: '#323232',
    default: '#222222',
  },
  primary: {
    light: '#ffa39e',
    main: '#ff4d4f',
    dark: '#db3537',
  },
  secondary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
  }
};

export const baseTheme: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiToolbar: {
      defaultProps: {
        variant: 'dense',
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 42,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '0.85rem',
          padding: '4px 12px',
          minHeight: 42,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
        size: 'small',
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'standard',
        size: 'small',
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: 'standard',
        size: 'small',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },

    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        html: {
          WebkitFontSmoothing: 'auto',
          fontSize: '0.875rem',
          lineHeight: 1.43,
          letterSpacing: '0.01071em',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {root: {backgroundImage: 'unset'}},
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, .7)',
          [`&.${tooltipClasses.tooltipPlacementTop}`]: {
            position: 'relative',
            bottom: -8,
          },
        },
      },
    },
  },
};


const darkTheme: ThemeOptions = {
  breakpoints: baseTheme.breakpoints,
  palette: paletteDark,
  components: {
    ...baseTheme.components,
    MuiListItem: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          backgroundColor: '#333',
          [`&.${listItemClasses.selected}`]: {
            backgroundColor: '#ffffff0d',
            '&:hover': {
              backgroundColor: '#ffffff14',
            },
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          [`${paperClasses.root}`]: {
            backgroundColor: '#393939', // +contrast
          },
        },
      },
    },
  },
};

const json = 
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "addresses": [{
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874"
    },
    {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874"
    }
  ],
    "phones": [
      "1-770-736-8031 x56442",
      "1-770-736-8031 x56442"
    ],
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
;

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkTheme}>
        <JsonPreview json={json} />
        </ThemeProvider>
    </StyledEngineProvider>

  );
}

export default App;
