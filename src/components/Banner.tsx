import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Photo } from 'pexels';
import { useGetPexelsPhotos } from '../hooks/useGetPexelsPhotos';

import { Container } from '@mui/material';
import { Box } from '@mui/system';

import { Carousel } from '../models/carousel';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

const Banner = ({ locationName }: { locationName: string }): JSX.Element => {
    const { photoData, isLoading } = useGetPexelsPhotos(locationName.substring(0, locationName.indexOf(',')));
    const [carousel, setCarousel] = React.useState<Carousel>({
        currentSlide: 0,
        totalSlides: 0,
        loaded: false,
    });

    React.useEffect(() => {
        if (photoData && !isLoading) {
            setCarousel({
                ...carousel,
                totalSlides: photoData?.photos.length,
                loaded: true,
            });
        }
    }, [photoData, isLoading]);

    function updateCarousel(position: number) {
        setCarousel({
            ...carousel,
            currentSlide:
                carousel?.totalSlides > carousel.currentSlide + position
                    ? carousel.currentSlide + position
                    : (carousel.currentSlide = 0),
        });
    }

    return (
        <BannerContainer loaded={carousel.loaded} disableGutters maxWidth="md">
            <CarouselContainer>
                {photoData?.photos &&
                    !isLoading &&
                    photoData?.photos?.map((image: Photo, index: number) => {
                        return (
                            <CarouselSlide
                                key={image.id}
                                slideIndex={index}
                                currentSlide={carousel.currentSlide}
                                width={100}
                                height={200}
                                avg_color={image.avg_color}
                                alt={image.alt}
                                src={image.src.large}
                            />
                        );
                    })}
                <NavArrowLeft>
                    <FontAwesomeIcon
                        onClick={() => updateCarousel(-1)}
                        color="#ffffffe0"
                        size="2x"
                        icon={faChevronCircleLeft}
                    />
                </NavArrowLeft>
                <NavArrowRight>
                    <FontAwesomeIcon
                        onClick={() => updateCarousel(1)}
                        color="#ffffffe0"
                        size="2x"
                        icon={faChevronCircleRight}
                    />
                </NavArrowRight>
            </CarouselContainer>
        </BannerContainer>
    );
};

const BannerContainer = styled(Container)<{ loaded: boolean }>`
    min-height: 20rem;
    display: ${(props) => (props.loaded ? 'block' : 'none')}!important;
`;

const fadeAnimation = keyframes`
    from {
        opacity: 0.4;
    }
    to {
        opacity: 1;
    }
`;

const CarouselContainer = styled(Box)`
    width: 100%;
    height: 200px;
    position: relative;
`;

const CarouselSlide = styled.img<{
    width: number;
    height: number;
    src: string;
    avg_color: string;
    currentSlide: number;
    slideIndex: number;
}>`
    height: 200px;
    width: 100%;
    object-fit: cover;
    background-color: ${(props) => props.avg_color};
    display: ${(props) => (props.slideIndex === props.currentSlide ? 'block' : 'none')};
    -webkit-animation-name: ${fadeAnimation};
    -webkit-animation-duration: 1.5s;
    animation-name: ${fadeAnimation};
    animation-duration: 1.5s;
`;

const NavArrowLeft = styled.button`
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1;
    background-color: transparent;
    border: none;
    &:hover {
        cursor: pointer;
    }
`;

const NavArrowRight = styled.button`
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 1;
    background-color: transparent;
    border: none;
    &:hover {
        cursor: pointer;
    }
`;

export default Banner;
