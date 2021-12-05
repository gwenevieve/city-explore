import React from 'react';

import './App.scss';
import styled from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { Container, Card, Typography } from '@mui/material';

import SearchBar from './components/Search';
import Weather from './components/weather/Weather';
import Map from './components/Map';

import { Coordinates } from './models/coordinates';

import background from './images/background.png';

const App = (): JSX.Element => {
    const [location, setLocation] = React.useState<Coordinates | undefined>(undefined);
    const [locationName, setLocationName] = React.useState<string | undefined>();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <AppContainer>
            {`theme.breakpoints.up('sm') matches: ${matches}`}
            <SearchBar setLocation={setLocation} setLocationName={setLocationName} />
            {location && (
                <>
                    <Container maxWidth="md">
                        <CityCard>
                            <Banner />
                            <CityDetails>
                                <Title variant="h1">{locationName}</Title>
                                <Weather location={location} />
                            </CityDetails>
                            <Map location={location} />
                        </CityCard>
                    </Container>
                </>
            )}
        </AppContainer>
    );
};

const AppContainer = styled.main`
    height: 100vh;
    background-image: url(${background});
    background-color: #f9f2eb;
    background-repeat: no-repeat;
    background-size: cover;
`;

const CityCard = styled(Card)``;

const CityDetails = styled.div`
    padding: 20px;
`;

const MiniCard = styled(Card)``;

const Banner = styled.div``;

const Title = styled(Typography)``;

const MiniTitle = styled(Typography)``;

export default App;
