import { createTheme } from '@mui/material/styles';
import createBreakpoints from '@mui/system/createTheme/createBreakpoints';

const breakpoints = createBreakpoints({});
const theme = createTheme({
    typography: {
        htmlFontSize: 10,
        h1: {
            fontFamily: "'Newsreader', serif",
            fontVariationSettings: "'wght' 700",
            letterSpacing: 1,
            color: '#2a2a2a',
            fontSize: '2.8rem',
            [breakpoints.up('md')]: {
                fontSize: '4.4rem',
                letterSpacing: 2,
            },
        },
        body1: {
            fontSize: '2.4rem',
            color: '#2a2a2a',
        },
        body2: {
            fontSize: '1.6rem',
            color: '#2a2a2a',
        },
    },
});

export default theme;
