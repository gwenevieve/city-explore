import React from 'react';

import './App.scss';
import styled from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';

import { Box, Container, Card, Typography } from '@mui/material';

import SearchBar from './components/Search';
import Weather from './components/weather/Weather';
import Map from './components/Map';

import { Coordinates } from './models/coordinates';

import background from './images/background.png';

const App = (): JSX.Element => {
    const [location, setLocation] = React.useState<Coordinates | undefined>(undefined);
    const [locationName, setLocationName] = React.useState<string | undefined>();
    const [isResultLoaded, setIsResultLoaded] = React.useState<boolean | undefined>(false);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <ThemeProvider theme={theme}>
            <AppContainer isResultLoaded={isResultLoaded}>
                <SearchBar
                    setIsResultLoaded={setIsResultLoaded}
                    isResultLoaded={isResultLoaded}
                    setLocation={setLocation}
                    setLocationName={setLocationName}
                />
                {location && (
                    <>
                        <AppInnerContainer maxWidth="md">
                            <CityCard elevation={0}>
                                <Banner />
                                <CityDetails padding={2}>
                                    <Title variant="h1">{locationName}</Title>
                                    <Weather location={location} />
                                </CityDetails>
                                <Map location={location} />
                            </CityCard>
                        </AppInnerContainer>
                    </>
                )}
                <Footer isResultLoaded={isResultLoaded}>
                    <Typography variant="body2">Copyright {new Date().getFullYear()} Marie Sarah Felton</Typography>
                </Footer>
            </AppContainer>
        </ThemeProvider>
    );
};

const AppContainer = styled.main<{ isResultLoaded: boolean | undefined }>`
    height: ${(props) => (props.isResultLoaded ? '100%' : '100vh')};
    background-image: url(${background});
    background-color: #f9f2eb;
    background-repeat: no-repeat;
    background-size: cover;
`;

const AppInnerContainer = styled(Container)`
    padding-bottom: 1rem;
`;

const CityCard = styled(Card)``;

const CityDetails = styled(Box)``;

const MiniCard = styled(Card)``;

const Banner = styled.div``;

const Title = styled(Typography)``;

const MiniTitle = styled(Typography)``;

const Footer = styled.div<{ isResultLoaded: boolean | undefined }>`
    position: ${(props) => (props.isResultLoaded ? 'initial' : 'absolute')};
    bottom: 1rem;
    padding-bottom: ${(props) => (props.isResultLoaded ? '1rem' : '0')};
    display: flex;
    justify-content: center;
    width: 100%;
`;

export default App;
