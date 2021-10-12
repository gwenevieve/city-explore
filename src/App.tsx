import React from 'react';
import './App.scss';

import styled from 'styled-components';
import { Container, Box, Card, Typography } from '@mui/material';

import SearchBar from './components/Search';
import Weather from './components/Weather';
import Map from './components/Map';

import { Coordinates } from './models/coordinates';

const App = (): JSX.Element => {
    const [location, setLocation] = React.useState<Coordinates | undefined>(undefined);
    const [locationName, setLocationName] = React.useState<string | undefined>();
    return (
        <AppContainer>
            <SearchBar setLocation={setLocation} setLocationName={setLocationName} />
            {location && (
                <>
                    <Container maxWidth="md">
                        <CityCard>
                            <Banner />
                            <Title variant="h1">{locationName}</Title>
                            <Weather location={location} />
                            <Map />
                        </CityCard>
                    </Container>
                    <Container>
                        <Box
                            maxWidth="md"
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignContent: 'center',
                                p: 1,
                                m: 1,
                            }}
                        >
                            <MiniCard sx={{ minWidth: 250 }}>
                                <MiniTitle variant="h2">Surrey, BC</MiniTitle>
                            </MiniCard>
                            <MiniCard sx={{ minWidth: 250 }}>
                                <MiniTitle variant="h2">Victoria, BC</MiniTitle>
                            </MiniCard>
                            <MiniCard sx={{ minWidth: 250 }}>
                                <MiniTitle variant="h2">Burnaby, BC</MiniTitle>
                            </MiniCard>
                        </Box>
                    </Container>
                </>
            )}
        </AppContainer>
    );
};

const AppContainer = styled.main``;

const CityCard = styled(Card)``;

const MiniCard = styled(Card)``;

const Banner = styled.div``;

const Title = styled(Typography)``;

const MiniTitle = styled(Typography)``;

export default App;
