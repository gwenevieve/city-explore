import { createTheme } from '@mui/material/styles';
import createBreakpoints from '@mui/system/createTheme/createBreakpoints';

const breakpoints = createBreakpoints({});
const theme = createTheme({
    typography: {
        h1: {
            fontFamily: "'Newsreader', serif",
            fontVariationSettings: "'wght' 700",
            letterSpacing: 1,
            color: '#2a2a2a',
            fontSize: '1.8em',
            [breakpoints.up('md')]: {
                fontSize: '3.4em',
                letterSpacing: 2,
            },
        },
        body1: {
            fontSize: '0.8em',
            color: '#2a2a2a',
        },
    },
});

export default theme;
