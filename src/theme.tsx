import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        h1: {
            fontFamily: "'Newsreader', serif",
            fontWeight: 'bold',
            letterSpacing: 2,
            color: '#2a2a2a',
        },
        body1: {
            fontSize: 14,
            color: '#2a2a2a',
        },
    },
});

export default theme;
